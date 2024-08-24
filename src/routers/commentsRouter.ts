import {Router} from 'express'
import { adminMiddleware } from '../global/middlewares/adminMiddleware'
import { applyCommentQueryDefaults } from '../features/comments/middlewares/commentDefaultQueryValues'
import { commentQueryValidator, commentValidator } from '../features/comments/middlewares/commentValidator'
import { findCommentController } from '../features/comments/controllers/findCommentController'
import { updateCommentController } from '../features/comments/controllers/updateCommentController'
import { deleteCommentController } from '../features/comments/controllers/deleteCommentController'

export const commentsRouter = Router()
 
commentsRouter.get('/:id', applyCommentQueryDefaults, commentQueryValidator, findCommentController)
commentsRouter.put('/:commentId', ...commentValidator, updateCommentController)
commentsRouter.delete('/:commentId', adminMiddleware, deleteCommentController)