import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import {DeviceViewModel} from '../../../models/DeviceModel'

export const getActiveSecurityDevicesController = async (req: Request<any>, res: Response<DeviceViewModel[] | ErrorResultModel>) => {
    try {

    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

};
