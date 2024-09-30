import {Router} from 'express'
import { loginController } from '../features/users/controllers/loginController'
import { getUserInfoController } from '../features/users/controllers/getUserInfoController'
import { authMiddleware } from '../global/middlewares/authMiddleware'
import { authRefreshTokenMiddleware } from '../global/middlewares/authRefreshTokenMiddleware'
import { registrationController } from '../features/users/controllers/registrationController'
import { registrationConfirmationController } from '../features/users/controllers/registrationConfirmationController'
import { registrationEmailResendingController } from '../features/users/controllers/registrationEmailResendingController'
import { refreshTokensController } from '../features/users/controllers/refreshTokensController'
import { logoutController } from '../features/users/controllers/logoutController'
import { userValidator, userResendValidator, userConfirmationValidator } from '../features/users/middlewares/userValidator'
import {rateLimiter} from '../global/middlewares/rateLimiterMiddleware'


export const authRouter = Router()
 
authRouter.post('/login', rateLimiter, loginController)
authRouter.get('/me', authMiddleware, getUserInfoController)
authRouter.post('/registration', rateLimiter, ...userValidator, registrationController)
authRouter.post('/registration-confirmation', rateLimiter, userConfirmationValidator, registrationConfirmationController)
authRouter.post('/registration-email-resending', rateLimiter, userResendValidator, registrationEmailResendingController)
authRouter.post('/refresh-token', authRefreshTokenMiddleware, refreshTokensController)
authRouter.post('/logout', authRefreshTokenMiddleware, logoutController)

