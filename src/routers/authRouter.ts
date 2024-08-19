import {Router} from 'express'
import { loginController } from '../features/users/controllers/loginController'

export const authRouter = Router()
 
authRouter.post('/', loginController)