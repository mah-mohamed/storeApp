import express from 'express'
import { adminRoute, protectedRoute } from '../middleware/products.middleware.js'
import { analyticFunc } from '../controllers/analytics.controller.js'

const router = express.Router()

router.get('/',protectedRoute,adminRoute,analyticFunc)
export default router