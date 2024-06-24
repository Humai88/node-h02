import {Router} from 'express'
import { deleteAllDataController } from '../testing/deleteAllDataController'


export const testRouter = Router()
 
testRouter.delete('/', deleteAllDataController)