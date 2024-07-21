import { Request, Response } from 'express';
import { blogsQueryRepository } from '../../../repositories/blogsQueryRepository';
import { PaginatorBlogViewModel, QueryBlogModel } from '../../../models/QueryModel';


export const getBlogsController = async (req: Request<any, any, any, QueryBlogModel>, res: Response<PaginatorBlogViewModel>) => {
  const blogs = await blogsQueryRepository.getBlogs(req.query)
  res
    .status(200)
    .json(blogs)
};
