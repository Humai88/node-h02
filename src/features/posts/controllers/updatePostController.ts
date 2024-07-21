import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PostViewModel } from '../../../models/PostViewModel';
import { postsService } from '../../../domains/posts-service';
import { ParamModel } from '../../../models/QueryModel';


export const updatePostController = async (req: Request<ParamModel, null, PostViewModel>, res: Response<null | ErrorResultModel>) => {
    const postToUpdate = await postsService.updatePost(req.params.id, req.body)
    if (!postToUpdate) {
        res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'id' }] })
        return
    }
    res
        .sendStatus(204)
};
