import {Router} from 'express'
import { getBlogsController } from '../features/blogs/controllers/getBlogsController'
import { createBlogController } from '../features/blogs/controllers/createBlogController'
import { findBlogController } from '../features/blogs/controllers/findBlogController'
import { deleteBlogController } from '../features/blogs/controllers/deleteBlogController'
import { updateBlogController } from '../features/blogs/controllers/updateBlogController'
import { blogValidator } from '../features/blogs/middlewares/blogValidator'
import { adminMiddleware } from '../global/middlewares/adminMiddleware'

export const blogsRouter = Router()
 
blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', ...blogValidator, createBlogController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.delete('/:id', adminMiddleware, deleteBlogController)
blogsRouter.put('/:id', ...blogValidator, updateBlogController)
