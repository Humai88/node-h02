import { Request, Response } from 'express';
import { commentsQueryRepository } from '../../../repositories/commentsQueryRepository';
import { CommentViewModel } from '../../../models/CommentModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';


export const findCommentController = async (req: Request<any, CommentViewModel, any, any>, res: Response<CommentViewModel | ErrorResultModel>) => {
  const comment = await commentsQueryRepository.findComment(req.params.id)
    if (!comment) {
      res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'id' }] })
      return
    }
    res.status(200).json(comment)
};
