import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { jwtService } from '../../../application/jwtService';
import { authService } from '../../../domains/auth-service';
import { usersDBRepository } from '../../../repositories/usersDBRepository';
import { LoginSuccessViewModel } from '../../../models/UserModel';


export const refreshTokensController = async (req: Request<any>, res: Response<LoginSuccessViewModel | ErrorResultModel>) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Refresh token is missing', field: 'refreshToken' }]  
            });
        }

        const decoded  = await jwtService.verifyRefreshToken(refreshToken);
        if (!decoded!.userId || !decoded!.deviceId) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]   
            });
        }
        const user = await usersDBRepository.findUserById(decoded!.userId);
        if (!user) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]   
            });
        }
        await authService.invalidateRefreshToken(refreshToken);
        const newAccessToken = await jwtService.generateToken(user)
        const newRefreshToken = await jwtService.generateRefreshToken(user, decoded!.deviceId);
        await authService.updateRefreshToken(newRefreshToken);

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
      });
        return res.status(200).send(newAccessToken);

    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

};