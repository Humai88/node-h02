import {Router} from 'express'
import { loginController } from '../features/users/controllers/loginController'
import { getUserInfoController } from '../features/users/controllers/getUserInfoController'

export const authRouter = Router()
 
authRouter.post('/login', loginController)
authRouter.post('/me', getUserInfoController)