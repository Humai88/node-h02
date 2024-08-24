import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { usersService } from '../../../domains/users-service';
import { UserInputModel, UserViewModel } from '../../../models/UserModel';
import { usersQueryRepository } from '../../../repositories/usersQueryRepository';
import { usersDBRepository } from '../../../repositories/usersDBRepository';


export const updateCommentController = async (req: Request<any, UserViewModel, UserInputModel>, res: Response<UserViewModel | ErrorResultModel>) => {
      const isLoginUnique = await usersDBRepository.checkIfLoginIsUnique(req.body.login)
      const isEmailUnique = await usersDBRepository.checkIfEmailIsUnique(req.body.email)
      if (!isLoginUnique) {
            res.status(400).json({ errorsMessages: [{ message: 'Login is already taken', field: 'login' }] })
            return
      }
      if (!isEmailUnique) {
            res.status(400).json({ errorsMessages: [{ message: 'Email is already registered', field: 'email' }] })
            return
      }
      const newUserId = await usersService.createUser(req.body)
      const user = await usersQueryRepository.findUser(newUserId)
      user && res
            .status(201)
            .json(user)
};

