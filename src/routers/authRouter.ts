import {Router} from 'express'
import { loginController } from '../features/users/controllers/loginController'
import { getUserInfoController } from '../features/users/controllers/getUserInfoController'
import { authMiddleware } from '../global/middlewares/authMiddleware'
import { registrationController } from '../features/users/controllers/registrationController'
import { registrationConfirmationController } from '../features/users/controllers/registrationConfirmationController'
import { registrationEmailResendingController } from '../features/users/controllers/registrationEmailResendingController'
import { userValidator, userResendValidator, userConfirmationValidator } from '../features/users/middlewares/userValidator'

export const authRouter = Router()
 
authRouter.post('/login', loginController)
authRouter.get('/me', authMiddleware, getUserInfoController)
authRouter.post('/registration', ...userValidator, registrationController)
authRouter.post('/registration-confirmation', userConfirmationValidator, registrationConfirmationController)
authRouter.post('/registration-email-resending', userResendValidator, registrationEmailResendingController)