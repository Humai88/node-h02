import { body, param } from 'express-validator';
import { inputErrors } from '../../../global/middlewares/inputErrors';
import { adminMiddleware } from '../../../global/middlewares/adminMiddleware';
import { blogsCollection } from '../../../db/mongo-db';
import { ObjectId } from 'mongodb';

export const blogValidator = [
  adminMiddleware,
  body('name').isString().withMessage('Name must be a string').trim().isLength({ min: 1, max: 15 }).withMessage('Name must be between 1 and 15 characters'),
  body('description').isString().withMessage('Description must be a string').trim().isLength({ min: 1, max: 500 }).withMessage('Description must be between 1 and 500 characters'),
  body('websiteUrl').isString().trim().isLength({ min: 1, max: 100 }).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).withMessage('Invalid URL format'),
  inputErrors
];

export const postInBlogValidator = [
  adminMiddleware,
  body('title').isString().withMessage('Title must be a string').trim().isLength({ min: 1, max: 30 }).withMessage('Title must be between 1 and 30 characters'),
  body('content').isString().withMessage('Content must be a string').trim().isLength({ min: 1, max: 1000 }).withMessage('Content must be between 1 and 1000 characters'),
  body('shortDescription').isString().withMessage('Short description must be a string').trim().isLength({ min: 1, max: 100 }).withMessage('Short description must be between 1 and 100 characters'),
  param('id').trim().isLength({ min: 1 }).withMessage('Blog ID is required').custom(async value => {
    const objectId = new ObjectId(value);
    const blog = await blogsCollection.findOne({ _id: objectId })
    if (!blog) {
      throw new Error('There is no such blog');
    }
    return true
  }), 
  inputErrors
];