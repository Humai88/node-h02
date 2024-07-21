import {Router} from 'express'
import { getPostsController } from '../features/posts/controllers/getPostsController'
import { createPostController } from '../features/posts/controllers/createPostController'
import { findPostController } from '../features/posts/controllers/findPostController'
import { deletePostController } from '../features/posts/controllers/deletePostController'
import { updatePostController } from '../features/posts/controllers/updatePostController'
import { postQueryValidator, postValidator } from '../features/posts/middlewares/postValidator'
import { adminMiddleware } from '../global/middlewares/adminMiddleware'
import { applyPostQueryDefaults } from '../features/posts/middlewares/postDefaultQueryValues'

export const postsRouter = Router()
 
postsRouter.get('/', applyPostQueryDefaults, [...postQueryValidator], getPostsController)
postsRouter.post('/', ...postValidator, createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', adminMiddleware, deletePostController)
postsRouter.put('/:id', ...postValidator, updatePostController)