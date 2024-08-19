import { Request, Response } from 'express';
import { PaginatorUserViewModel, QueryUserModel } from '../../../models/QueryModel';
import { usersQueryRepository } from '../../../repositories/usersQueryRepository';


export const getUsersController = async (req: Request<any, any, any, QueryUserModel>, res: Response<PaginatorUserViewModel>) => {
  const users = await usersQueryRepository.getUsers(req.query)
  res
    .status(200)
    .json(users)
};
