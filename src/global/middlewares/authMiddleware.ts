import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../../application/jwtService';
import { usersQueryRepository } from '../../repositories/usersQueryRepository';
import { UserViewModel } from '../../models/UserModel';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'] as string

  if (!auth) {
    res
      .send(401)
    return
  }

  const token = req.headers['authorization']?.split(' ')[1]
  const userId = token ? await jwtService.getUserIdByToken(token) : null;
  if (userId) {
    const userFromDB = await usersQueryRepository.findUser(userId)
    if (userFromDB) {
      req.user = userFromDB
    }
    next()
  } else {
    res
      .send(401)
  }

}