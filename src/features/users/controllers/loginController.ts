import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { LoginInputModel, LoginSuccessViewModel } from '../../../models/UserModel';
import { usersService } from '../../../domains/users-service';
import { jwtService } from '../../../application/jwtService';

export const loginController = async (req: Request<any, null, LoginInputModel>, res: Response<LoginSuccessViewModel | ErrorResultModel>) => {
    try {
        const user = await usersService.checkCredentials(req.body)
        if (!user) {
            return res.status(401).json({ errorsMessages: [{ message: 'User not found', field: 'loginOrEmail' }] })
        } else {
            const token = await jwtService.generateToken(user)
            return res
                .status(200).send(token)
        }
    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

};