import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PostInputModel } from '../../../models/PostInputModel';
import { PostViewModel } from '../../../models/PostViewModel';
import { PostsService } from '../../../domains/posts-service';


export const createPostController = async (req: Request<any, PostViewModel | ErrorResultModel, PostInputModel>, res: Response<PostViewModel | ErrorResultModel>) => {
  const newBlog = await PostsService.createPost(req.body)
  res
    .status(201)
    .json(newBlog)
};
