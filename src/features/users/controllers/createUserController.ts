import { Request, Response } from 'express';
import { BlogInputModel } from '../../../models/BlogInputModel';
import { BlogViewModel } from '../../../models/BlogViewModel';
import { ErrorResultModel } from '../../../models/ErrorResultModel';
import { blogsQueryRepository } from '../../../repositories/blogsQueryRepository';
import { usersService } from '../../../domains/users-service';



export const createUserController = async (req: Request<any, BlogViewModel, BlogInputModel>, res: Response<BlogViewModel | ErrorResultModel>) => {
const newBlogId = await usersService.createUser(req.body)
const blog = await blogsQueryRepository.findBlog(newBlogId)
 blog && res
      .status(201)
      .json(blog)
};

