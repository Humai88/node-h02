import {Router} from 'express'
import { adminMiddleware } from '../global/middlewares/adminMiddleware'
import {  commentIdParamValidator, commentValidator } from '../features/comments/middlewares/commentValidator'
import { findCommentController } from '../features/comments/controllers/findCommentController'
import { updateCommentController } from '../features/comments/controllers/updateCommentController'
import { deleteCommentController } from '../features/comments/controllers/deleteCommentController'

export const commentsRouter = Router()
 
commentsRouter.get('/:id', findCommentController)
commentsRouter.put('/:commentId', ...commentValidator, commentIdParamValidator, updateCommentController)
commentsRouter.delete('/:commentId', adminMiddleware, commentIdParamValidator, deleteCommentController)