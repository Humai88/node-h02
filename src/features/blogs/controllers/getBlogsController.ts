import { Request, Response } from 'express';
import { blogsQueryRepository } from '../../../repositories/blogsQueryRepository';
import { PaginatorBlogViewModel, QueryModel } from '../../../models/QueryModel';


export const getBlogsController = async (req: Request<any, any, any, QueryModel>, res: Response<PaginatorBlogViewModel>) => {
  const blogs = await blogsQueryRepository.getBlogs(req.query)
  res
    .status(200)
    .json(blogs)
};
