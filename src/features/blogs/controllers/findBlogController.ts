import { Request, Response } from 'express';
import { blogsRepository } from '../../../repositories/blogsRepository';


export const findBlogController = (req: Request, res: Response) => {
  const blog = blogsRepository.findBlog(req.params.id)
  if (!blog) {
    res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
    return
  }
  res.status(200).json(blog)
};
