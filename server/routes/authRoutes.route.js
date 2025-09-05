import exprsess from 'express'
import { loginFunc, logoutFunc, signUpFunc ,refreshTokenFunc} from '../controllers/authRoutes.controller.js'

const router = exprsess.Router()

router.post('/signUp',signUpFunc)
router.post('/login',loginFunc)
router.post('/logout',logoutFunc)
router.post('/refreshToken',refreshTokenFunc)



export default router