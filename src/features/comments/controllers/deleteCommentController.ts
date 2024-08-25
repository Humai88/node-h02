import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { commentsService } from '../../../domains/comments-service';


export const deleteCommentController = async (req: Request<{commentId: string}>, res: Response<null | ErrorResultModel>) => {
  const commentToDelete = await commentsService.deleteComment(req.params.commentId)
  if (!commentToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Commentr not found', field: 'commentId' }] })
      return
  }
  res
      .sendStatus(204)
};
