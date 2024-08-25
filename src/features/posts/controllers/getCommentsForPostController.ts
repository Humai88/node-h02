import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PaginatorCommentViewModel,  QueryPostModel } from '../../../models/QueryModel';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';


export const getCommentsForPostController = async (req: Request<{postId: string}, any, any, QueryPostModel>, res: Response<PaginatorCommentViewModel | ErrorResultModel>) => {
  const post = await postsQueryRepository.findPost(req.params.postId)
  if (!post) {
    res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'postId' }] })
    return
  }
  const comments = await postsQueryRepository.getComments(req.query, req.params.postId)
  res.status(200).json(comments)
};
