import { Request, Response } from 'express';
import { ParamModel } from '../../../models/BlogInputModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PostsService } from '../../../domains/posts-service';


export const deletePostController = async (req: Request<ParamModel>, res: Response<null | ErrorResultModel>) => {
  const postToDelete = await PostsService.deletePost(req.params.id)
  if (!postToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
