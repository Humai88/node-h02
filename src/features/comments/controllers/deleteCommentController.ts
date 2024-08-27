import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { commentsService } from '../../../domains/comments-service';
import { commentsDBRepository } from '../../../repositories/commentsDBRepository';


export const deleteCommentController = async (req: Request<{ commentId: string }>, res: Response<null | ErrorResultModel>) => {
    try {
        const { commentId } = req.params
        const commentToDelete = await commentsService.deleteComment(commentId)
        if (!commentToDelete) {
            res.status(404).json({ errorsMessages: [{ message: 'Comment not found', field: 'commentId' }] })
            return
        }
        // const isUserAuthorOfComment = await commentsDBRepository.checkIfUserIfAuthorOfComment(req.user!, commentId)
        // if (!isUserAuthorOfComment) {
        //     res.status(403).json({ errorsMessages: [{ message: 'You are not the author of this comment', field: 'userId' }] })
        //     return
        // }
        return res
            .sendStatus(204)

    } catch (error) {
        return res.status(500).json({
            errorsMessages: [{ message: 'Internal server error', field: 'server' }]
        });
    }

};
