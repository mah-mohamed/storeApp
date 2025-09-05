import express from 'express'
import authRoutes from './routes/authRoutes.route.js'
import productsRoutes from './routes/productsRoutes.route.js'
import cartRoutes from './routes/cartRoutes.route.js'
import dotenv from 'dotenv'
import connectDB from './lib/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 3434

app.use('/api/auth',authRoutes)
app.use('/api/product',productsRoutes)
app.use('/api/cart',cartRoutes)

app.listen(port,()=>{
    connectDB()
    console.log(`server running on port ${port}`)
})
