import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { authService } from '../../../domains/auth-service';
import { jwtService } from '../../../application/jwtService';
import { deviceSessionsDBRepository } from '../../../repositories/deviceSessionsDBRepository';


export const terminateSpecificDeviceSessionController = async (req: Request<{ deviceId: string }>, res: Response<null | ErrorResultModel>) => {
  try {
    const {deviceId} = req.params;
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
    const sessionToRemove = await deviceSessionsDBRepository.findSessionByDeviceId(deviceId);
    if (!sessionToRemove) {
      return res.status(404).json({
        errorsMessages: [{ message: 'Session not found', field: 'deviceId' }]
      });
    }
    if (sessionToRemove.userId !== decoded!.userId) {
      return res.status(403).json({
        errorsMessages: [{ message: 'Forbidden: Cannot delete session of another user', field: 'deviceId' }]
      });
    }

    await authService.removeSpecificDeviceSession(deviceId);
    return res.sendStatus(204);


  } catch (error) {
    return res.status(500).json({
      errorsMessages: [{ message: 'Internal server error', field: 'server' }]
    });
  }
};

