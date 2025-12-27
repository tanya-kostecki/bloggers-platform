import { body } from 'express-validator';

const titleValidation = body('title')
  .isString()
  .withMessage('title should be a string')
  .trim()
  .notEmpty()
  .withMessage('Title is required')
  .isLength({ max: 30 })
  .withMessage('Title should not be longer than 30 characters');

const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('Short description should be a string')
  .trim()
  .notEmpty()
  .withMessage('Short description is required')
  .isLength({ max: 100 })
  .withMessage('Short description should not be longer than 100 characters');

const contentValidation = body('content')
  .isString()
  .withMessage('Content should be a string')
  .trim()
  .notEmpty()
  .withMessage('content is required')
  .isLength({ max: 1000 })
  .withMessage('Content should not be longer than 1000 characters');

const blogIdValidation = body('blogId')
  .isString()
  .withMessage('blogId should be a string')
  .trim()
  .notEmpty()
  .withMessage('blogId is required')
  .isMongoId()
  .withMessage('blogId must be a valid MongoDb ObjectId');

export const postInputValidationMiddleware = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
];
