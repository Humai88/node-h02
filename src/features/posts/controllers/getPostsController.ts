import { Request, Response } from 'express';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';
import { PaginatorPostViewModel, QueryPostModel } from '../../../models/QueryModel';


export const getPostsController = async (req: Request<any, any, any, QueryPostModel>, res: Response<PaginatorPostViewModel>) => {
  const posts = await postsQueryRepository.getPosts(req.query)
  res
    .status(200)
    .json(posts)
};
