import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { PostViewModel } from '../../../models/PostViewModel';
import { PostsRepository } from '../../../repositories/postsRepository';


export const updatePostController = (req: Request<ParamModel, null, PostViewModel>, res: Response<null | ErrorResultModel>) => {
  const postToUpdate = PostsRepository.updatePost(req.params.id,req.body)
  if (!postToUpdate) {
      res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
