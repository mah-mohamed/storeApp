import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        unique : true,
        required : true
    },
    products : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'product',
            required : true
        },
        price :  {
            type : Number,
            required : true,
            min : 0
        },
        quantity : {
            type : Number,
            required : true,
            min : 0
        }
    }],
    totalPrice : {
        type : Number,
        required : true,
        min : 0
    },
    paimentMethod : {
        type  :String , 
        required : [true , 'paiment method is required']
    }
},{timestamps : true})
const Order = mongoose.model('paiment', orderSchema)
export default Order