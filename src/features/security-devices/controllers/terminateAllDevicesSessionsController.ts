import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { authService } from '../../../domains/auth-service';
import { jwtService } from '../../../application/jwtService';

export const terminateAllDevicesSessionsController = async (req: Request<any>, res: Response<null | ErrorResultModel>) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Refresh token is missing', field: 'refreshToken' }]
      });
    }

    const decoded = await jwtService.verifyRefreshToken(refreshToken);
    if (!decoded!.userId || !decoded!.deviceId) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]
      });
    }

    await authService.removeOtherDeviceSessions(decoded!.deviceId);
    return res.sendStatus(204);


  } catch (error) {
    return res.status(500).json({
      errorsMessages: [{ message: 'Internal server error', field: 'server' }]
    });
  }

};


