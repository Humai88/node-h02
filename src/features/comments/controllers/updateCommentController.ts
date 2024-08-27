import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { commentsService } from '../../../domains/comments-service';
import { CommentInputModel } from '../../../models/CommentModel';
import { commentsDBRepository } from '../../../repositories/commentsDBRepository';


export const updateCommentController = async (req: Request<{ commentId: string }, any, CommentInputModel>, res: Response<null | ErrorResultModel>) => {
    try {
        const { commentId } = req.params
        const commentToUpdate = await commentsService.updateComment(commentId, req.body)
        if (!commentToUpdate) {
            res.status(404).json({ errorsMessages: [{ message: 'Comment not found', field: 'commentId' }] })
            return
        }
        const isUserAuthorOfComment = await commentsDBRepository.checkIfUserIfAuthorOfComment(req.user!, commentId)
        if (!isUserAuthorOfComment) {
            res.status(403).json({ errorsMessages: [{ message: 'You are not the author of this comment', field: 'userId' }] })
            return
        }
        return res
            .sendStatus(204)

    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

};


