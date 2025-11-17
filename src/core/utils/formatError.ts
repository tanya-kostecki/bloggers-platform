import { FieldValidationError } from 'express-validator';
import { FieldError } from '../types/fieldError';

export const formatError = (error: FieldValidationError): FieldError => {
  return {
    field: error.path,
    message: error.msg,
  };
};
