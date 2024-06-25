import { Request, Response } from 'express';
import { blogsRepository } from '../../../repositories/blogsRepository';


export const deleteBlogController = (req: Request, res: Response) => {
  const blogToDelete = blogsRepository.deleteBlog(req.params.id)
  if (!blogToDelete) {
      res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
      return
  }
  res
      .sendStatus(204)
};
