import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { BlogsService } from '../../../domains/blogs-service';
import { PostViewModel } from '../../../models/PostViewModel';


export const findPostsInBlogController = async (req: Request<ParamModel>, res: Response<PostViewModel[] | ErrorResultModel>) => {
  const posts = await BlogsService.findPostsInBlog(req.params.id)
  if (!posts) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
    return
  }
  res.status(200).json(posts)
};
