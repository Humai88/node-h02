import { Request, Response } from 'express';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { PaginatorPostViewModel, QueryPostModel } from '../../../models/QueryModel';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';
import { blogsQueryRepository } from '../../../repositories/blogsQueryRepository';


export const getPostsInBlogController = async (req: Request<{blogId: string}, any, any, QueryPostModel>, res: Response<PaginatorPostViewModel | ErrorResultModel>) => {
  const blog = await blogsQueryRepository.findBlog(req.params.blogId)
  if (!blog) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'blogId' }] })
    return
  }
  const posts = await postsQueryRepository.getPosts(req.query, req.params.blogId)
  res.status(200).json(posts)
};

