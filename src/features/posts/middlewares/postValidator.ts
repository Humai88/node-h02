import { body } from 'express-validator';
import { inputErrors } from '../../../global/middlewares/inputErrors';

export const postValidator = [
  body('title').isString().withMessage('Title must be a string').trim().isLength({ min: 1, max: 30 }).withMessage('Name must be between 1 and 30 characters'),
  body('content').isString().withMessage('Content must be a string').trim().isLength({ min: 1, max: 1000 }).withMessage('Content must be between 1 and 1000 characters'),
  body('shortDescription').isString().withMessage('Short description must be a string').trim().isLength({ min: 1, max: 100 }).withMessage('Short description must be between 1 and 100 characters'),
  body('blogId').isString().withMessage('Blog ID must be a string').trim().isLength({ min: 1}).withMessage('Blog ID is required'),
  inputErrors
];