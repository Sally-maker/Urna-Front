import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

function getValidationsError(error: ValidationError) {
  const validationErrors: Errors = {};

  error.inner.forEach((err) => {
    validationErrors[String(err.path)] = err.message;
  });

  return validationErrors;
}

export default getValidationsError;
