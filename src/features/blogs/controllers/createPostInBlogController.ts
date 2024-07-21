import { Request, Response } from 'express';
import { PostInBlogInputModel } from '../../../models/BlogInputModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { blogsService } from '../../../domains/blogs-service';
import { PostViewModel } from '../../../models/PostViewModel';
import { ParamModel } from '../../../models/QueryModel';


export const createPostInBlogController = async (req: Request<{blogId: string}, PostViewModel, PostInBlogInputModel>, res: Response<PostViewModel | ErrorResultModel>) => {
  const blog = await blogsService.findBlog(req.params.blogId)
  if (!blog) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'blogId' }] })
    return
  }
const newPost = await blogsService.createPostInBlog(req.params.blogId, req.body)
  res
      .status(201)
      .json(newPost)
};



