import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { ParamModel } from '../../../models/BlogInputModel';
import { blogsService } from '../../../domains/blogs-service';


export const deleteBlogController = async (req: Request<ParamModel>, res: Response<null | ErrorResultModel>) => {
  const blogToDelete = await blogsService.deleteBlog(req.params.id)
  if (!blogToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
