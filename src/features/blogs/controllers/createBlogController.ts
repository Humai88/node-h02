import { Request, Response } from 'express';
import { BlogInputModel } from '../../../models/BlogInputModel';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { blogsService } from '../../../domains/blogs-service';
import { blogsQueryRepository } from '../../../repositories/blogsQueryRepository';



export const createBlogController = async (req: Request<any, BlogViewModel, BlogInputModel>, res: Response<BlogViewModel | ErrorResultModel>) => {
const newBlogId = await blogsService.createBlog(req.body)
const blog = await blogsQueryRepository.findBlog(newBlogId)
 blog && res
      .status(201)
      .json(blog)
};

