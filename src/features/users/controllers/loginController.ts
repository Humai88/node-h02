import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { LoginInputModel, LoginSuccessViewModel } from '../../../models/UserModel';
import { authService } from '../../../domains/auth-service';
import { jwtService } from '../../../application/jwtService';


export const loginController = async (req: Request<any, null, LoginInputModel>, res: Response<LoginSuccessViewModel | ErrorResultModel>) => {
    try {
        const user = await authService.checkCredentials(req.body)
        if (!user) {
            return res.status(401).json({ errorsMessages: [{ message: 'User not found', field: 'loginOrEmail' }] })
        } else {
            const accessToken = await jwtService.generateToken(user)
            const refreshToken = await jwtService.generateRefreshToken(user);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
            });
            return res
                .status(200).send(accessToken)
        }
    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

}