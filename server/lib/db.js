import mongoose from "mongoose";
const connectDB = async()=>{
   await mongoose.connect(process.env.MONGO_URL).then( ()=>{
    console.log('connected to database')
   }).catch(e => console.error(e))
}
export default connectDB