import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

const MESSAGE = "Invalid request parameters";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super(MESSAGE);

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
