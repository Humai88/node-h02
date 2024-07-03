import { Request, Response } from 'express';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { BlogsDBRepository } from '../../../repositories/blogsDBRepository';


export const findBlogController = async (req: Request<ParamModel>, res: Response<BlogViewModel | ErrorResultModel>) => {
  const blog = await BlogsDBRepository.findBlog(req.params.id)
  if (!blog) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
    return
  }
  res.status(200).json(blog)
};
