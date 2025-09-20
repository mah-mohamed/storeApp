import express from 'express'
import authRoutes from './routes/authRoutes.route.js'
import productsRoutes from './routes/productsRoutes.route.js'
import cartRoutes from './routes/cartRoutes.route.js'
import couponRoutes from './routes/couponRoutes.route.js'
import paimentRoutes from './routes/productsRoutes.route.js'
import analyticsRoutes from './routes/analytic.route.js'
import dotenv from 'dotenv'
import connectDB from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 3434

app.use('/api/auth',authRoutes)
app.use('/api/product',productsRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/coupon',couponRoutes)
app.use('/api/coupon',paimentRoutes)
app.use('/api/analytics',analyticsRoutes)

app.listen(port,()=>{
    connectDB()
    console.log(`server running on port ${port}`)
})
