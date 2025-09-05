import express from 'express'
import { protectedRoute } from '../middleware/products.middleware.js'
import { getCoupon, validateCoupon } from '../controllers/couponRoutes.controller.js'
const router = express.Router()

router.get('/',protectedRoute,getCoupon)
router.get('/validate',protectedRoute,validateCoupon)
export default router