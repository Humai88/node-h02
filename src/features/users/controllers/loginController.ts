import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { LoginInputModel } from '../../../models/UserModel';
import { usersService } from '../../../domains/users-service';

export const loginController = async (req: Request<any, null, LoginInputModel>, res: Response<null | ErrorResultModel>) => {
  const isLoginValid = await usersService.checkCredentials(req.body)
  if (!isLoginValid) {
      res.status(401).json({ errorsMessages: [{ message: 'User not found', field: 'loginOrEmail' }] })
      return
  }
  res
      .sendStatus(204)
};