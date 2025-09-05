import Product from "../models/product.model.js"
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
export async function getAllProducts(req , res){
    try {
        const products = await Product.find({})
        res.json({products})
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
export async function getFeaturedProducts(req,res){
    try {
        let featuredProducts = await redis.get('featured_products')
    if (featuredProducts) { return res.json(JSON.parse(featuredProducts))}
    featuredProducts= await Product.find({isFeatured :true})
    if (featuredProducts){
        await redis.set('featured_products',featuredProducts)
        res.status(200).json(featuredProducts)
    }
    else{
        throw new Error('no featured product listed')
    }
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

export async function addProduct(req,res){
    try {
        const {name, price , description , category , image }= req.body
        if(image){
            const cloudinaryRes = await cloudinary.uploader.upload(image ,  {folder : 'products'})
        }
        const product = new Product({
            name,price,description,category,
            image : cloudinaryRes?.secure_url? cloudinaryRes.secure_url : ''
        })
        await product.save()
        res.status(200).json('product added successfuly')
    } catch (error) {
        console.log('error',error.message)
        res.status(400).json({message : error.message})
    }
}

export async function deleteProduct(req,res){
    try {
        
      const id = req.params.id
      const product = await Product.findById(id)

      if (!product) return res.status(404).json('product not found')
       const isDeleted = await cloudinary.uploader.destroy(`products/${product.image.public_id}`)
      if(isDeleted){
        if(product.isFeatured===true)
        await updateRedisCach()
        return res.status(200).json('product deleted successfuly')
      }else{
      throw new Error('couldnt delete the image from cloudinary')
        }
    } catch (error) {
        console.log('error',error.message)
        res.status(400).json({message : error.message})
    }
}

export async function getRecommendedProducts(req,res){
    try {
        const recommended = await Product.aggregate([
            {
                $sample :  {size : 3}
            },
            {
                $project : {
                    name : 1,
                    price : 1,
                    description : 1 ,
                    image  :1 ,
                    category : 1
                }
            }
        ])
        res.status(200).json(recommended)
    } catch (error) {
        console.log('error in recommended function ',error.message)
        res.status(400).json({message:error.message})
    }
}

export async function getCategoryProducts(req,res){
    const category = req.params.category
    try {
        const categoryProducts = await Product.find({category})
        res.status(200).json(categoryProducts)
    } catch (error) {
        console.log('error in category function ',error.message)
        res.status(400).json({message:error.message})
    }
}

export async function toggleFeatured(req ,res ){
    const productId = req.params.id
    try {
        const product = await Product.findById(productId).lean()
        product.isFeatured = !product.isFeatured
        await updateRedisCach()
        
    } catch (error) {
        console.log('error in toggleFeatured function ',error.message)
        res.status(400).json({message:error.message})
    }
}
async function updateRedisCach(){
    try {
        const products = await Product.find({ isFeatured :true}).lean()
        await redis.set('featured_products',JSON.stringify(products))
    } catch (error) {
        console.log('error in updateRedisCach function ',error.message)
        return error    
    }
}