import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { LoginSuccessViewModel } from '../../../models/UserModel';
import { jwtService } from '../../../application/jwtService';
import { authService } from '../../../domains/auth-service';
import { usersDBRepository } from '../../../repositories/usersDBRepository';


export const refreshTokensController = async (req: Request<any>, res: Response<LoginSuccessViewModel | ErrorResultModel>) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Refresh token is missing', field: 'refreshToken' }]  
            });
        }

        const userId = await jwtService.getUserIdByRefreshToken(refreshToken);
        const user = await usersDBRepository.findUserById(userId!.toString());
        if (!user) {
            return res.status(401).json({
                errorsMessages: [{ message: 'Invalid refresh token', field: 'refreshToken' }]   
            });
        }

        const newRefreshToken = await jwtService.generateRefreshToken(user);
        await authService.updateRefreshToken(user._id.toString(), newRefreshToken);

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 20000
      });
        return res.sendStatus(200)

    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

};