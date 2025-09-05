import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , `must provide product's name `] 
    },
    price  :{
        type : Number ,
        required : [true , `must provide product's price`],
        min : 0 , 
    },
    description : {
        type : String,
    },
    image : {
        type : String,
        required : [true , 'image is required']
    },
    isFeatured : {
        type :Boolean,
        default :false
    },
    category : {
        type : String ,
        enum : ["shoes","pants","shirts","underwear"],
        required : [true , "category is required"]
    }
},{timestamps : true})
const Product  = mongoose.model('product',productSchema)
export default Product