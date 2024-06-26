import { Request, Response } from 'express';
import { BlogsRepository } from '../../../repositories/blogsRepository';
import { BlogInputModel } from '../../../models/BlogInputModel';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';


export const createBlogController = (req: Request<null, BlogViewModel | ErrorResultModel, BlogInputModel>, res: Response<BlogViewModel | ErrorResultModel>) => {
const newBlog = BlogsRepository.createBlog(req.body)
  res
      .status(201)
      .json(newBlog)
};

