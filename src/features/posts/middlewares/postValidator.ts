import { body } from 'express-validator';
import { inputErrors } from '../../../global/middlewares/inputErrors';
import { adminMiddleware } from '../../../global/middlewares/adminMiddleware';
import { blogsCollection } from '../../../db/mongo-db';

export const postValidator = [
  adminMiddleware,
  body('title').isString().withMessage('Title must be a string').trim().isLength({ min: 1, max: 30 }).withMessage('Title must be between 1 and 30 characters'),
  body('content').isString().withMessage('Content must be a string').trim().isLength({ min: 1, max: 1000 }).withMessage('Content must be between 1 and 1000 characters'),
  body('shortDescription').isString().withMessage('Short description must be a string').trim().isLength({ min: 1, max: 100 }).withMessage('Short description must be between 1 and 100 characters'),
  body('blogId').isString().withMessage('Blog ID must be a string').trim().isLength({ min: 1 }).withMessage('Blog ID is required').custom(async value => {
    const blog = await blogsCollection.findOne({ id: value })
    if (!blog) {
      throw new Error('There is no such blog');
    }
    return true
  }), 
  inputErrors
];