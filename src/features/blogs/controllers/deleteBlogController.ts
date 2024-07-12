import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { BlogsService } from '../../../domains/blogs-service';


export const deleteBlogController = async (req: Request<ParamModel>, res: Response<null | ErrorResultModel>) => {
  const blogToDelete = await BlogsService.deleteBlog(req.params.id)
  if (!blogToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
