import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { authService } from '../../../domains/auth-service';
import { jwtService } from '../../../application/jwtService';
import { tokenBlacklistRepository } from '../../../repositories/tokenBlacklistRepository';
import { usersDBRepository } from '../../../repositories/usersDBRepository';

export const logoutController = async (req: Request<any>, res: Response<null | ErrorResultModel>) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Refresh token is missing', field: 'refreshToken' }]
      });
    }

    try {
      const decoded = await jwtService.verifyRefreshToken(refreshToken);
      if (!decoded!.userId || !decoded!.deviceId) {
        throw new Error('Invalid token payload');
      }
    } catch (tokenError) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Invalid or expired refresh token', field: 'refreshToken' }]
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