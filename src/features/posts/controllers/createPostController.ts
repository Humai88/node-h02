import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PostInputModel } from '../../../models/PostInputModel';
import { PostViewModel } from '../../../models/PostViewModel';
import { postsService } from '../../../domains/posts-service';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';


export const createPostController = async (req: Request<any, PostViewModel | ErrorResultModel, PostInputModel>, res: Response<PostViewModel | ErrorResultModel>) => {
  const newPostId = await postsService.createPost(req.body)
  const post = await postsQueryRepository.findPost(newPostId)
  post && res
       .status(201)
       .json(post)
};
