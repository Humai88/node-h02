import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { usersService } from '../../../domains/users-service';
import { UserInputModel, UserViewModel } from '../../../models/UserModel';
import { usersQueryRepository } from '../../../repositories/usersQueryRepository';
import { usersDBRepository } from '../../../repositories/usersDBRepository';


export const registrationController = async (req: Request<any, UserViewModel, UserInputModel>, res: Response<UserViewModel | ErrorResultModel>) => {
      try {
            const isLoginUnique = await usersDBRepository.checkIfLoginIsUnique(req.body.login)
            const isEmailUnique = await usersDBRepository.checkIfEmailIsUnique(req.body.email)
            if (!isLoginUnique) {
                  return res.status(400).json({ errorsMessages: [{ message: 'Login is already taken', field: 'login' }] })
            }
            if (!isEmailUnique) {
                  return res.status(400).json({ errorsMessages: [{ message: 'Email is already registered', field: 'email' }] })
            }
            const newUser = await usersService.registerUser(req.body)
            return newUser && res
                  .sendStatus(204)

      } catch (error) {
            return res.status(500).json({
                  errorsMessages: [{ message: 'Internal server error', field: 'server' }]
            });
      }
};

