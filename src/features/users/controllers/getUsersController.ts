import { Request, Response } from 'express';
import { PaginatorBlogViewModel, QueryBlogModel } from '../../../models/QueryModel';
import { usersQueryRepository } from '../../../repositories/usersQueryRepository';


export const getUsersController = async (req: Request<any, any, any, QueryBlogModel>, res: Response<PaginatorBlogViewModel>) => {
  const blogs = await usersQueryRepository.getUsers(req.query)
  res
    .status(200)
    .json(blogs)
};
