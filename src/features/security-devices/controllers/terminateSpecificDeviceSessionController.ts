import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';


// export const terminateSpecificDeviceSessionController = async (req: Request<{ deviceId: string }>, res: Response<null | ErrorResultModel>) => {
//   try {
//     const { deviceId  } = req.params;
//   } catch (error) {
//     return res.status(500).json({
//       errorsMessages: [{ message: 'Internal server error', field: 'server' }]
//     });
//   }
// };
