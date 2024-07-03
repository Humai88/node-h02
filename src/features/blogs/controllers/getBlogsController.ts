import { Request, Response } from 'express';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { BlogsDBRepository } from '../../../repositories/blogsDBRepository';


export const getBlogsController = async (req: Request, res: Response<BlogViewModel[]>) => {
  const blogs = await BlogsDBRepository.getBlogs()
  res
    .status(200)
    .json(blogs)
};
