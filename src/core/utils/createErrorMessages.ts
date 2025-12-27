import { FieldError } from '../types/fieldError';

export const createErrorMessages = (
  errors: Array<{ message: string; field?: string }>,
): { errorsMessages: FieldError[] } => {
  return {
    errorsMessages: errors.map((error) => ({
      message: error.message,
      field: error.field ?? '',
    })),
  };
};
