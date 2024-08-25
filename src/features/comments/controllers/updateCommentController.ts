import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { commentsService } from '../../../domains/comments-service';
import { CommentInputModel } from '../../../models/CommentModel';


export const updateCommentController = async (req: Request<any, any, CommentInputModel>, res: Response<null | ErrorResultModel>) => {
      const commentToUpdate = await commentsService.updateComment(req.params.commentId, req.body)
      if (!commentToUpdate) {
          res.status(404).json({ errorsMessages: [{ message: 'Comment not found', field: 'commentId' }] })
          return
      }
      res
          .sendStatus(204)
};


