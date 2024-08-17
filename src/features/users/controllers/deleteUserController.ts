import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/QueryModel';
import { usersService } from '../../../domains/users-service';


export const deleteUserController = async (req: Request<ParamModel>, res: Response<null | ErrorResultModel>) => {
  const userToDelete = await usersService.deleteUser(req.params.id)
  if (!userToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'User not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
