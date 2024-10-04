import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

export const rateLimiter = rateLimit({
  windowMs: 10 * 1000, 
  max: 5, 
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true, 
  legacyHeaders: false,
  

  handler: (req: Request, res: Response, next: NextFunction) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime.getTime() - Date.now()) / 1000
    });
    // next()
  },
  

});
