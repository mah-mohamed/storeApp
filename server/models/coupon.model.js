import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code :  {
        type : String,
        required : true
    },
    discountPercecntage :{
        type :Number,
        required : true,
        min : 0,
        max : 100
    },
    isActive : {
        type : Boolean,
        required : true
    },
    expirationDate : {
        type : Date,
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