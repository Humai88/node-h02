import { Request, Response } from 'express';
import { PostViewModel } from '../../../models/PostViewModel';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';


export const getPostsController = async (req: Request, res: Response<PostViewModel[]>) => {
  const posts = await postsQueryRepository.getPosts()
  res
    .status(200)
    .json(posts)
};
