import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [ true , 'user must have a name']
    },
    email :{
        type : String,
        required : [true , ' user must have an email'],
        trim : true,
        lowercase : true,
        unique  : true
    },
    password : {
        type : String,
        required : [true , 'user must have a password'],
        minlenght : [6,'password must be more than 5 characters']
    },
    cartItems :[
        {
         quantity :{
           type : Number,
           default : 1
         },
         product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
         }
        }
    ],
    role : {
        type : String,
       enum : ['customer','admin'],
       default : 'customer'
    },
    preference : [{
        type : String
    }]
},{
    timestamps : true
})

userSchema.pre('save', async function (next){
    if ( !this.isModified('password')) return next();
    try{
     this.password = await bcrypt.hash(this.password,10)
     next()
    }catch(e){
     next(e)
    }
})
userSchema.methods.comparePassword = async function(password){
    return (bcrypt.compare(password,this.password))
}
const User = mongoose.model('User',userSchema)

export default User