import { Request, Response } from 'express';
import {  QueryUserModel } from '../../../models/QueryModel';
import { usersQueryRepository } from '../../../repositories/usersQueryRepository';
import { MeViewModel } from '../../../models/UserModel';


export const getUserInfoController = async (req: Request<any, any, any, QueryUserModel>, res: Response<MeViewModel | null>) => {
  const me = await usersQueryRepository.getMeInfo(req.user)
  res
    .status(200)
    .json(me)
};
