import { ValidationError } from "express-validator";

type SerializedError = {
  message: string;
  field?: string;
};

interface CustomError {
  statusCode: number;
  serializeErrors(): SerializedError[];
}

export class RequestValidationError extends Error implements CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.param,
    }));
  }
}
