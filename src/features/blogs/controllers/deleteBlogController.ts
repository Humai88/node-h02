import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { BlogsDBRepository } from '../../../repositories/blogsDBRepository';


export const deleteBlogController = async (req: Request<ParamModel>, res: Response<null | ErrorResultModel>) => {
  const blogToDelete = await BlogsDBRepository.deleteBlog(req.params.id)
  if (!blogToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
