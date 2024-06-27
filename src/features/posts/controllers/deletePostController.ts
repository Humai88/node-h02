import { Request, Response } from 'express';
import { ParamModel } from '../../../models/BlogInputModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PostsRepository } from '../../../repositories/postsRepository';


export const deletePostController = (req: Request<ParamModel>, res: Response<null | ErrorResultModel>) => {
  const postToDelete = PostsRepository.deletePost(req.params.id)
  if (!postToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
