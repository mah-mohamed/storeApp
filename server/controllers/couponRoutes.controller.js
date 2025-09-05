import Coupon from "../models/coupon.model.js"

export async function getCoupon(req,res){
    try {
        const coupon = await Coupon.find({user : req.user._id , isActive : true })
        res.status(200).json(coupon || null)
    } catch (error) {
        console.log('error in getCoupon',error.message)
        res.status(400).json({message : error.message})
    }
}
export async function validateCoupon(req,res){
    try {
        const {code}= req.body
        const coupon = await Coupon.find({code: code , isActive:true , user : req.user._id})
        if (!coupon) return res.status(400).json({message : 'invalid coupon'})
        if (coupon.expirationDate < new Date()){
            coupon.isActive = false
            await coupon.save()
            res.status(400).json({message :'expired coupon'})
        }
        res.status(200).json({
            message : 'coupon is valid',
            code : coupon.code,
            discount : coupon.discountPercecntage 
        })
    } catch (error) {
        console.log('error in validateCoupon',error.message)
        res.status(400).json({message : error.message})
    }
    
}