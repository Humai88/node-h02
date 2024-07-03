import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { PostViewModel } from '../../../models/PostViewModel';
import { PostsDBRepository } from '../../../repositories/postsDBRepository';


export const updatePostController = async (req: Request<ParamModel, null, PostViewModel>, res: Response<null | ErrorResultModel>) => {
    const postToUpdate = await PostsDBRepository.updatePost(req.params.id, req.body)
    if (!postToUpdate) {
        res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'id' }] })
        return
    }
    res
        .sendStatus(204)
};
