import { Request, Response } from 'express';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { blogsQueryRepository } from '../../../repositories/blogsQueryRepository';


export const getBlogsController = async (req: Request, res: Response<BlogViewModel[]>) => {
  const searchNameTerm =  req.query.searchNameTerm as string;
  const blogs = await blogsQueryRepository.getBlogs(searchNameTerm)
  res
    .status(200)
    .json(blogs)
};
