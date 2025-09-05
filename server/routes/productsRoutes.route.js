import express from 'express'
import { getAllProducts , getFeaturedProducts , addProduct, deleteProduct , getRecommendedProducts, getCategoryProducts, toggleFeatured} from '../controllers/productsRoutes.controller.js'
import { protectdRoute,adminRoute, protectedRoute } from '../middleware/products.middleware.js'
const router = express.Router()

router.get('/allProducts',protectdRoute,adminRoute,getAllProducts)
router.get ('/featured',getFeaturedProducts)
router.get ('/recommended',getRecommendedProducts)
router.get ('/category/:category',getCategoryProducts)
router.post('/',protectedRoute,adminRoute,addProduct)
router.delete('/:id',protectedRoute,adminRoute,deleteProduct)
router.patch('/:id',protectedRoute,adminRoute,toggleFeatured)

export default router