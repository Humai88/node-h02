import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PostViewModel } from '../../../models/PostViewModel';
import { postsService } from '../../../domains/posts-service';
import { ParamModel } from '../../../models/QueryModel';


export const findPostController = async (req: Request<ParamModel>, res: Response<PostViewModel | ErrorResultModel>) => {
  const post = await postsService.findPost(req.params.id)
  if (!post) {
    res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'id' }] })
    return
  }
  res.status(200).json(post)
};
