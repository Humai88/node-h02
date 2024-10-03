import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { jwtService } from '../../../application/jwtService';
import { authService } from '../../../domains/auth-service';
import { usersDBRepository } from '../../../repositories/usersDBRepository';
import { LoginSuccessViewModel } from '../../../models/UserModel';


export const refreshTokensController = async (req: Request<any>, res: Response<LoginSuccessViewModel | ErrorResultModel>) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        if (!oldRefreshToken) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Refresh token is missing', field: 'refreshToken' }]
            });
        }

        try {
            const decoded = await jwtService.verifyRefreshToken(oldRefreshToken);
            if (!decoded!.userId || !decoded!.deviceId) {
                throw new Error('Invalid token payload');
            }
            const user = await usersDBRepository.findUserById(decoded!.userId);
            const newAccessToken = await jwtService.generateToken(user!)
            const newRefreshToken = await jwtService.generateRefreshToken(user!, decoded!.deviceId);
            await authService.updateRefreshToken(oldRefreshToken, newRefreshToken);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
            });
            return res.status(200).send(newAccessToken);
        } catch (tokenError) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Invalid or expired refresh token', field: 'refreshToken' }]
            });
        }


    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

};