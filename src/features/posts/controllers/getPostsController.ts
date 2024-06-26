import { Request, Response } from 'express';
import { PostsRepository } from '../../../repositories/postsRepository';
import { PostViewModel } from '../../../models/PostViewModel';


export const getPostsController = (req: Request, res: Response<PostViewModel[]>) => {
  const posts = PostsRepository.getPosts()
  res
    .status(200)
    .json(posts)
};
