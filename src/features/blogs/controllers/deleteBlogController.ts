import { Request, Response } from 'express';
import { BlogsRepository } from '../../../repositories/blogsRepository';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';


export const deleteBlogController = (req: Request<ParamModel>, res: Response<null | ErrorResultModel>) => {
  const blogToDelete = BlogsRepository.deleteBlog(req.params.id)
  if (!blogToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
