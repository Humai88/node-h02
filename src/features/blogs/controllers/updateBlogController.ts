import { Request, Response } from 'express';
import { BlogsRepository } from '../../../repositories/blogsRepository';
import { ParamModel } from '../../../models/BlogInputModel';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';


export const updateBlogController = (req: Request<ParamModel, null, BlogViewModel>, res: Response<null | ErrorResultModel>) => {
  const blogToUpdate = BlogsRepository.updateBlog(req.params.id,req.body)
  if (!blogToUpdate) {
      res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
