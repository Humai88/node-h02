import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { usersService } from '../../../domains/users-service';
import { UserViewModel } from '../../../models/UserViewModel';
import { UserInputModel } from '../../../models/UserInputModel';
import { usersQueryRepository } from '../../../repositories/usersQueryRepository';


export const createUserController = async (req: Request<any, UserViewModel, UserInputModel>, res: Response<UserViewModel | ErrorResultModel>) => {
const newUserId = await usersService.createUser(req.body)
const user = await usersQueryRepository.findUser(newUserId)
 user && res
      .status(201)
      .json(user)
};

