import { Request, Response, NextFunction } from 'express';
import { FieldValidationError, validationResult } from 'express-validator';
import { formatError } from '../utils/formatError';
import { HttpStatus } from '../types/http-statuses';

export const inputResultValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
    .formatWith((error) => formatError(error as FieldValidationError))
    .array({ onlyFirstError: true });

  if (errors.length > 0) {
    return res.status(HttpStatus.BadRequest).json({ errorsMessages: errors });
  }

  next();
};
