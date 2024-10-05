import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { authService } from '../../../domains/auth-service';
import { jwtService } from '../../../application/jwtService';
import { tokenBlacklistRepository } from '../../../repositories/tokenBlacklistRepository';

export const logoutController = async (req: Request<any>, res: Response<null | ErrorResultModel>) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Refresh token is missing', field: 'refreshToken' }]
      });
    }

    const verificationResult = await jwtService.verifyRefreshToken(refreshToken);

    if (!verificationResult.isValid) {
      if (verificationResult.isExpired) {
        return res.status(401).json({
          errorsMessages: [{ message: 'Refresh token has expired', field: 'refreshToken' }]
        });
      }
      return res.status(401).json({
        errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]
      });
    }
  
    const { payload } = verificationResult;
  
    if (!payload?.userId || !payload?.deviceId) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Invalid token payload', field: 'refreshToken' }]
      });
    }
    await tokenBlacklistRepository.addToBlacklist(refreshToken);
    await authService.removeDevice(refreshToken);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      errorsMessages: [{ message: 'Internal server error', field: 'server' }]
    });
  }

};