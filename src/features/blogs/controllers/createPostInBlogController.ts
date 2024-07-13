import { Request, Response } from 'express';
import { ParamModel, PostInBlogInputModel } from '../../../models/BlogInputModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { BlogsService } from '../../../domains/blogs-service';
import { PostViewModel } from '../../../models/PostViewModel';



export const createPostInBlogController = async (req: Request<ParamModel, PostViewModel, PostInBlogInputModel>, res: Response<PostViewModel | ErrorResultModel>) => {
const newPost = await BlogsService.createPostInBlog(req.params.id, req.body)
  res
      .status(201)
      .json(newPost)
};

