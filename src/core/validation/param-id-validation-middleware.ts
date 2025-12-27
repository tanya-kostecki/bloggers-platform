import { param } from 'express-validator';

export const paramIdValidationMiddleware = [
  param('id')
    .exists()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isMongoId()
    .withMessage('Incorrect format of ObjectId'),
];

export const paramBlogIdValidationMiddleware = [
  param('blogId')
    .exists()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isMongoId()
    .withMessage('Incorrect format of ObjectId'),
];
