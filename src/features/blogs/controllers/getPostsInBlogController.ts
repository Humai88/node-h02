import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PaginatorPostViewModel, ParamModel, QueryPostModel } from '../../../models/QueryModel';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';
import { blogsService } from '../../../domains/blogs-service';


export const getPostsInBlogController = async (req: Request<ParamModel, any, any, QueryPostModel>, res: Response<PaginatorPostViewModel | ErrorResultModel>) => {
  const blog = await blogsService.findBlog(req.params.id)
  if (!blog) {
    res.sendStatus(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'id' }] })
    return
  }
  const posts = await postsQueryRepository.getPosts(req.query, req.params.id)
  res.status(200).json(posts)
};

