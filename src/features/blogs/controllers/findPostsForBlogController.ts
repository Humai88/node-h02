import { Request, Response } from 'express';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { BlogsService } from '../../../domains/blogs-service';


export const findPostsForBlogController = async (req: Request<ParamModel>, res: Response<BlogViewModel | ErrorResultModel>) => {
  const blog = await BlogsService.findBlog(req.params.id)
  if (!blog) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
    return
  }
  res.status(200).json(blog)
};
