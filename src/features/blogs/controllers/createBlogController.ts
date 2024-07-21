import { Request, Response } from 'express';
import { BlogInputModel } from '../../../models/BlogInputModel';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { blogsService } from '../../../domains/blogs-service';



export const createBlogController = async (req: Request<any, BlogViewModel, BlogInputModel>, res: Response<BlogViewModel | ErrorResultModel>) => {
const newBlog = await blogsService.createBlog(req.body)
  res
      .status(201)
      .json(newBlog)
};

