import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { LoginInputModel, LoginSuccessViewModel } from '../../../models/UserModel';
import { usersService } from '../../../domains/users-service';
import { jwtService } from '../../../application/jwtService';

export const loginController = async (req: Request<any, null, LoginInputModel>, res: Response<LoginSuccessViewModel | ErrorResultModel>) => {
    const user = await usersService.checkCredentials(req.body)
    if (!user) {
        res.status(401).json({ errorsMessages: [{ message: 'User not found', field: 'loginOrEmail' }] })
    } else {
        const token = await jwtService.generateToken(user)
        res
            .status(201).send(token)
    }

};