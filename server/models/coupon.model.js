import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code :  {
        type : String,
        required : true
    },
    discountPercecntage :{
        type :Number,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    expirationDate : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }

},{timestamps :true})

const Coupon = mongoose.model('coupon',couponSchema)

export default Coupon