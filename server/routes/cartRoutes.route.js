import express from 'express'
import { protectedRoute } from '../middleware/products.middleware.js'
import { addCartProduct, getWholeCart, removeAllFromCart, updateQuantity } from '../controllers/cartRoutes.controller.js'
const router = express.Router()

router.get('/',protectedRoute,getWholeCart)
router.post('/',protectedRoute,addCartProduct)
router.delete('/',protectedRoute,removeAllFromCart)
router.patch('/',protectedRoute,updateQuantity)

export default router