import { Request, Response, NextFunction, RequestHandler } from 'express';
import { jwtService } from '../../application/jwtService';
import { usersQueryRepository } from '../../repositories/usersQueryRepository';

export const authRefreshTokenMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      errorsMessages: [{ message: 'No refresh token provided', field: 'refreshToken' }]  
    });
  }

  try {
    const userId = jwtService.getUserIdByRefreshToken(refreshToken);
    if (!userId) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]  
      });
    }

    const user = await usersQueryRepository.findUser(userId.toString());
    if (!user) {
      return res.status(401).json({ 
        errorsMessages: [{ message: 'User not found', field: 'user' }]  
      });
    }

    req.user = user;
    next();
    return
  } catch (error) {
    return res.status(401).json({
      errorsMessages: [{ message: 'Invalid or expired refresh token', field: 'refreshToken' }]  
    });
  }
};