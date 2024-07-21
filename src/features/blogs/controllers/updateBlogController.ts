import { Request, Response } from 'express';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { blogsService } from '../../../domains/blogs-service';
import { ParamModel } from '../../../models/QueryModel';


export const updateBlogController = async (req: Request<ParamModel, null, BlogViewModel>, res: Response<null | ErrorResultModel>) => {
  const blogToUpdate = await blogsService.updateBlog(req.params.id,req.body)
  if (!blogToUpdate) {
      res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
