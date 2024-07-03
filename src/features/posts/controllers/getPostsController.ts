import { Request, Response } from 'express';
import { PostViewModel } from '../../../models/PostViewModel';
import { PostsDBRepository } from '../../../repositories/postsDBRepository';


export const getPostsController = async (req: Request, res: Response<PostViewModel[]>) => {
  const posts = await PostsDBRepository.getPosts()
  res
    .status(200)
    .json(posts)
};
