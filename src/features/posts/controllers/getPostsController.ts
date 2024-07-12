import { Request, Response } from 'express';
import { PostViewModel } from '../../../models/PostViewModel';
import { PostsService } from '../../../domains/posts-service';


export const getPostsController = async (req: Request, res: Response<PostViewModel[]>) => {
  const posts = await PostsService.getPosts()
  res
    .status(200)
    .json(posts)
};
