import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { PostViewModel } from '../../../models/PostViewModel';
import { blogsQueryRepository } from '../../../repositories/blogsQueryRepository';


export const getPostsInBlogController = async (req: Request<ParamModel>, res: Response<PostViewModel[] | ErrorResultModel>) => {
  const posts = await blogsQueryRepository.getPostsInBlog(req.params.id)
  if (!posts) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
    return
  }
  res.status(200).json(posts)
};
