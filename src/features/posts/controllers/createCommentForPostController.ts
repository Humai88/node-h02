import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { postsService } from '../../../domains/posts-service';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';
import { CommentInputModel, CommentViewModel } from '../../../models/CommentModel';
import { commentsQueryRepository } from '../../../repositories/commentsQueryRepository';


export const createCommentForPostController = async (req: Request<any, CommentViewModel | ErrorResultModel, CommentInputModel>, res: Response<CommentViewModel | ErrorResultModel>) => {
  const post = await postsQueryRepository.findPost(req.params.postId)
  if (!post) {
    res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'postId' }] })
    return
  }
const newCommentId = await postsService.createCommentForPost(req.params.postId, req.body, req.user)
const comment = await commentsQueryRepository.findComment(newCommentId)
comment && res
      .status(201)
      .json(comment)
};
