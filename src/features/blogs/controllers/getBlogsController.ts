import { Request, Response } from 'express';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { BlogsService } from '../../../domains/blogs-service';


export const getBlogsController = async (req: Request, res: Response<BlogViewModel[]>) => {
  const searchNameTerm =  req.query.searchNameTerm as string;
  const blogs = await BlogsService.getBlogs(searchNameTerm)
  res
    .status(200)
    .json(blogs)
};
