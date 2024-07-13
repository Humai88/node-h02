import {Router} from 'express'
import { getBlogsController } from '../features/blogs/controllers/getBlogsController'
import { createBlogController } from '../features/blogs/controllers/createBlogController'
import { findBlogController } from '../features/blogs/controllers/findBlogController'
import { deleteBlogController } from '../features/blogs/controllers/deleteBlogController'
import { updateBlogController } from '../features/blogs/controllers/updateBlogController'
import { blogValidator, postInBlogValidator } from '../features/blogs/middlewares/blogValidator'
import { adminMiddleware } from '../global/middlewares/adminMiddleware'
import { createPostInBlogController } from '../features/blogs/controllers/createPostInBlogController'
import { findPostsInBlogController } from '../features/blogs/controllers/findPostsInBlogController'

export const blogsRouter = Router()
 
blogsRouter.get('/', getBlogsController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.get('/:id/posts', findPostsInBlogController)
blogsRouter.post('/', ...blogValidator, createBlogController)
blogsRouter.delete('/:id', adminMiddleware, deleteBlogController)
blogsRouter.put('/:id', ...blogValidator, updateBlogController)
blogsRouter.post('/:id/posts', ...postInBlogValidator, createPostInBlogController)