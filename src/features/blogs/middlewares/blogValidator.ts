import { body } from 'express-validator';
import { inputErrors } from '../../../global/middlewares/inputErrors';

export const blogValidator = [
  body('name').isString().withMessage('Name must be a string').trim().isLength({ min: 1, max: 15 }).withMessage('Name must be between 1 and 15 characters'),
  body('description').isString().withMessage('Description must be a string').trim().isLength({ min: 1, max: 500 }).withMessage('Description must be between 1 and 500 characters'),
  body('websiteUrl').isString().trim().isLength({ min: 1, max: 100 }).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).withMessage('Invalid URL format'),
  inputErrors
];