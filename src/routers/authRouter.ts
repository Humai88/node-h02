import {Router} from 'express'
import { loginController } from '../features/users/controllers/loginController'
import { getUserInfoController } from '../features/users/controllers/getUserInfoController'
import { authMiddleware } from '../global/middlewares/authMiddleware'

export const authRouter = Router()
 
authRouter.post('/login', loginController)
authRouter.get('/me', authMiddleware, getUserInfoController)