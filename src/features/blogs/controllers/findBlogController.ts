import { Request, Response } from 'express';
import { BlogsRepository } from '../../../repositories/blogsRepository';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';


export const findBlogController = (req: Request<ParamModel>, res: Response<BlogViewModel | ErrorResultModel>) => {
  const blog = BlogsRepository.findBlog(req.params.id)
  if (!blog) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
    return
  }
  res.status(200).json(blog)
};
