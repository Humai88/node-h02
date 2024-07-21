import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { postsService } from '../../../domains/posts-service';
import { ParamModel } from '../../../models/QueryModel';


export const deletePostController = async (req: Request<ParamModel>, res: Response<null | ErrorResultModel>) => {
  const postToDelete = await postsService.deletePost(req.params.id)
  if (!postToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Post not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
