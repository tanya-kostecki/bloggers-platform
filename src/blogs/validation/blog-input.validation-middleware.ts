import { body } from 'express-validator';

const nameValidation = body('name')
  .isString()
  .withMessage('Name should be a string')
  .trim()
  .notEmpty()
  .withMessage('Name is required')
  .isLength({ max: 15 })
  .withMessage('Name should not be longer than 15 characters');

const descriptionValidation = body('description')
  .isString()
  .withMessage('Description should be a string')
  .trim()
  .notEmpty()
  .withMessage('Description is required')
  .isLength({ max: 500 })
  .withMessage('Description should not be longer than 500 characters');

const websiteUrlValidation = body('websiteUrl')
  .isString()
  .withMessage('Website url should be a string')
  .trim()
  .notEmpty()
  .withMessage('Website URL is required')
  .isLength({ max: 100 })
  .withMessage('Website should not be longer than 100 characters')
  .custom(
    (value) =>
      !!value.match(
        /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
      ),
  )
  .withMessage('Invalid website URL');

export const blogInputValidationMiddleware = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
];
