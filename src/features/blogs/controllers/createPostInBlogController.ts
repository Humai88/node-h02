import { Request, Response } from 'express';
import { PostInBlogInputModel } from '../../../models/BlogInputModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { blogsService } from '../../../domains/blogs-service';
import { PostViewModel } from '../../../models/PostViewModel';
import { blogsQueryRepository } from '../../../repositories/blogsQueryRepository';
import { postsQueryRepository } from '../../../repositories/postsQueryRepository';


export const createPostInBlogController = async (req: Request<{blogId: string}, PostViewModel, PostInBlogInputModel>, res: Response<PostViewModel | ErrorResultModel>) => {
  const blog = await blogsQueryRepository.findBlog(req.params.blogId)
  if (!blog) {
    res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'blogId' }] })
    return
  }
const newPostId = await blogsService.createPostInBlog(req.params.blogId, req.body)
const post = await postsQueryRepository.findPost(newPostId)
 post && res
      .status(201)
      .json(post)
};



