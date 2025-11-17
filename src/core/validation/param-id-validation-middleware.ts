import { param } from 'express-validator';

export const paramIdValidationMiddleware = [
  param('id')
    .isString()
    .withMessage('Id must be a string')
    .trim()
    .notEmpty()
    .withMessage('Id is required')
    .isNumeric()
    .withMessage('Id must be a numeric string'),
];
