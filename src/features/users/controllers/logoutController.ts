import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { authService } from '../../../domains/auth-service';

export const logoutController = async (req: Request<any>, res: Response<null | ErrorResultModel>) => {
  try {
    const refreshToken = req.cookies.refreshToken;
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