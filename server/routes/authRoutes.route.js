import exprsess from 'express'
import { loginFunc, logoutFunc, signUpFunc ,refreshTokenFunc , getProfile} from '../controllers/authRoutes.controller.js'
import { protectedRoute } from '../middleware/products.middleware.js'

const router = exprsess.Router()

router.post('/signUp',signUpFunc)
router.post('/login',loginFunc)
router.post('/logout',logoutFunc)
router.post('/refreshToken',refreshTokenFunc)
router.get('/profile',protectedRoute,getProfile)


export default router