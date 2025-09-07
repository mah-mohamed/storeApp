import express from 'express'
import { protectedRoute } from '../middleware/products.middleware.js'
import { createCheckoutSession , checkoutSuccess} from '../controllers/paiment.controller.js'
const router = express.Router()

router.post("/create-checkout-session", protectedRoute, createCheckoutSession);
router.post("/checkout-success", protectedRoute, checkoutSuccess)

export default router