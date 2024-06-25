import {Router} from 'express'
import { getPostsController } from '../features/posts/controllers/getPostsController'
import { createPostController } from '../features/posts/controllers/createPostController'
import { findPostController } from '../features/posts/controllers/findPostController'
import { deletePostController } from '../features/posts/controllers/deletePostController'
import { updatePostController } from '../features/posts/controllers/updatePostController'

export const postsRouter = Router()
 
postsRouter.get('/', getPostsController)
postsRouter.post('/', createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', deletePostController)
postsRouter.put('/:id', updatePostController)