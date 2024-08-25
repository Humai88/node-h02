import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { commentsService } from '../../../domains/comments-service';
import { CommentInputModel } from '../../../models/CommentModel';
import { commentsDBRepository } from '../../../repositories/commentsDBRepository';


export const updateCommentController = async (req: Request<{commentId: string}, any, CommentInputModel>, res: Response<null | ErrorResultModel>) => {
    const isUserAuthorOfComment = await commentsDBRepository.checkIfUserIfAuthorOfComment(req.user!, req.params.commentId)
    if (!isUserAuthorOfComment) {
        res.status(403).json({ errorsMessages: [{ message: 'You are not the author of this comment', field: 'userId' }] })
    } else {
        const commentToUpdate = await commentsService.updateComment(req.params.commentId, req.body)
        if (!commentToUpdate) {
            res.status(404).json({ errorsMessages: [{ message: 'Comment not found', field: 'commentId' }] })
            return
        }
        res
            .sendStatus(204)
    }
    
};


