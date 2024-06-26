import { Request, Response } from 'express';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { BlogsRepository } from '../../../repositories/blogsRepository';


export const getBlogsController = (req: Request, res: Response<BlogViewModel[]>) => {
  const blogs = BlogsRepository.getBlogs()
  res
    .status(200)
    .json(blogs)
};
