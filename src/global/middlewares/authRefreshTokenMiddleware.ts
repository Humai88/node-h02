import { Request, Response, NextFunction, RequestHandler } from 'express';
import { jwtService } from '../../application/jwtService';
import { usersQueryRepository } from '../../repositories/usersQueryRepository';
import {tokenBlacklistRepository} from '../../repositories/tokenBlacklistRepository';
import jwt from 'jsonwebtoken';

export const authRefreshTokenMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      errorsMessages: [{ message: 'No refresh token provided', field: 'refreshToken' }]  
    });
  }
  const isTokenBlacklisted = await tokenBlacklistRepository.isBlacklisted(refreshToken);
  if (isTokenBlacklisted) {
    return res.status(401).json({
      errorsMessages: [{ message: 'Refresh token blacklisted', field: 'refreshToken' }]  
    }); 
  }

  try {
    const decoded = await jwtService.verifyRefreshToken(refreshToken);
    if (!decoded!.userId) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]  
      });
    }

    const user = await usersQueryRepository.findUser(decoded!.userId);
    if (!user) {
      return res.status(401).json({ 
        errorsMessages: [{ message: 'User not found', field: 'user' }]  
      });
    }

    req.user = user;
    next();
    return
  } catch (error) {
    console.error('Refresh token error:', error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Refresh token expired', field: 'refreshToken' }]  
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]  
      });
    } else {
      return res.status(500).json({
        errorsMessages: [{ message: 'Internal server error', field: 'server' }]  
      });
    }
  }
};