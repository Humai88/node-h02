import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PaginatorPostViewModel, ParamModel, QueryPostModel } from '../../../models/QueryModel';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';


export const getPostsInBlogController = async (req: Request<ParamModel, any, any, QueryPostModel>, res: Response<PaginatorPostViewModel| ErrorResultModel>) => {
  const posts = await postsQueryRepository.getPosts(req.query, req.params.id)
  if (!posts) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
    return
  }
  res.status(200).json(posts)
};
