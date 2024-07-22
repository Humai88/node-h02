import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PostInputModel } from '../../../models/PostInputModel';
import { PostViewModel } from '../../../models/PostViewModel';
import { postsService } from '../../../domains/posts-service';


export const createPostController = async (req: Request<any, PostViewModel | ErrorResultModel, PostInputModel>, res: Response<PostViewModel | ErrorResultModel>) => {
  const newPost = await postsService.createPost(req.body)
  res
    .status(201)
    .json(newPost)
};
