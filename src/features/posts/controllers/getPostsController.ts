import { Request, Response } from 'express';
import { PostViewModel } from '../../../models/PostViewModel';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';
import { PaginatorPostViewModel, QueryModel } from '../../../models/QueryModel';


export const getPostsController = async (req: Request<any, any, any, QueryModel>, res: Response<PaginatorPostViewModel>) => {
  const posts = await postsQueryRepository.getPosts(req.query)
  res
    .status(200)
    .json(posts)
};
