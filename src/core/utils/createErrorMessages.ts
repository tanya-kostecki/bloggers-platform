import { FieldError } from '../types/fieldError';

export const createErrorMessages = (
  validationErrors: FieldError[],
): { errorsMessages: FieldError[] } => {
  return { errorsMessages: validationErrors };
};
