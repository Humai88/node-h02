import { Request, Response } from 'express';
import { PostsRepository } from '../../../repositories/postsRepository';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PostInputModel } from '../../../models/PostInputModel';
import { PostViewModel } from '../../../models/PostViewModel';


export const createPostController = (req: Request<null, PostViewModel | ErrorResultModel, PostInputModel>, res: Response<PostViewModel | ErrorResultModel>) => {
  const newBlog = PostsRepository.createPost(req.body)
  res
      .status(201)
      .json(newBlog)
};
