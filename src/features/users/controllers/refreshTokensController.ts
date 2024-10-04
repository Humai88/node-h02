import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { jwtService } from '../../../application/jwtService';
import { authService } from '../../../domains/auth-service';
import { LoginSuccessViewModel } from '../../../models/UserModel';
import {tokenBlacklistRepository} from '../../../repositories/tokenBlacklistRepository';

export const refreshTokensController = async (req: Request<any>, res: Response<LoginSuccessViewModel | ErrorResultModel>) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        if (!oldRefreshToken) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Refresh token is missing', field: 'refreshToken' }]  
            });
        }
        const isTokenBlacklisted = await tokenBlacklistRepository.isBlacklisted(oldRefreshToken);
        if (isTokenBlacklisted) {
          return res.status(401).json({
            errorsMessages: [{ message: 'Refresh token blacklisted', field: 'refreshToken' }]  
          }); 
        }
        const decoded  = await jwtService.verifyRefreshToken(oldRefreshToken);
        if (!decoded!.userId || !decoded!.deviceId) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]   
            });
        }
        await tokenBlacklistRepository.addToBlacklist(oldRefreshToken);

        const newAccessToken = await jwtService.generateToken(decoded!.userId);
        const newRefreshToken = await jwtService.generateRefreshToken(decoded!.userId, decoded!.deviceId);
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