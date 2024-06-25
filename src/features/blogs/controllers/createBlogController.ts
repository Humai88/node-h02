import { Request, Response } from 'express';
import { blogsRepository } from '../../../repositories/blogsRepository';
import { BlogInputModel } from '../../../models/BlogInputModel';


export const createBlogController = (req: Request<BlogInputModel>, res: Response) => {
const newBlog = blogsRepository.createBlog(req.body)
  res
      .status(201)
      .json(newBlog)
};

