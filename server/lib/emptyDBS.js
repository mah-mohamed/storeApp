import User from "../models/user.model.js";
import connectDB from "./db.js";
import dotenv from 'dotenv'
import { redis } from "./redis.js";
dotenv.config()
connectDB()
await User.deleteMany()
const keys = await redis.keys("refresh_token:*"); 
if (keys.length > 0) {
  await redis.del(...keys); 
}
console.log('deleted all the users')