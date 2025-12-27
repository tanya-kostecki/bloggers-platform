import { Response } from 'express';
import { NotFoundError } from './not-found.error';
import { HttpStatus } from '../types/http-statuses';
import { DomainError } from './domain.error';
import { createErrorMessages } from '../utils/createErrorMessages';

export function errorsHandler(error: unknown, res: Response): void {
  if (error instanceof NotFoundError) {
    res.status(HttpStatus.NotFound).send(
      createErrorMessages([
        {
          message: error.message,
        },
      ]),
    );

    return;
  }

  if (error instanceof DomainError) {
    res.status(HttpStatus.UnprocessableEntity).send(
      createErrorMessages([
        {
          message: error.message,
          field: error.source,
        },
      ]),
    );

    return;
  }

  res.status(HttpStatus.InternalServerError).send(
    createErrorMessages([
      {
        message: 'Internal Server Error',
      },
    ]),
  );
  return;
}
