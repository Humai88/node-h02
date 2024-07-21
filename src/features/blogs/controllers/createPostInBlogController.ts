import { Request, Response } from 'express';
import { PostInBlogInputModel } from '../../../models/BlogInputModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { blogsService } from '../../../domains/blogs-service';
import { PostViewModel } from '../../../models/PostViewModel';
import { ParamModel } from '../../../models/QueryModel';


export const createPostInBlogController = async (req: Request<ParamModel, PostViewModel, PostInBlogInputModel>, res: Response<PostViewModel | ErrorResultModel>) => {
const newPost = await blogsService.createPostInBlog(req.params.id, req.body)
  res
      .status(201)
      .json(newPost)
};

