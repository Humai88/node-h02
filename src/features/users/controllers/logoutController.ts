import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import {  LoginSuccessViewModel } from '../../../models/UserModel';
import { jwtService } from '../../../application/jwtService';

export const logoutController = async (req: Request<any>, res: Response<null | ErrorResultModel>) => {
    try {
            // const token = await jwtService.generateToken(req.user)
            // return res
            //     .status(200).send(token) 
            return null
    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

};