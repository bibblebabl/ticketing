import { CustomError } from "./custom-error";

const MESSAGE = "Error connection to Database";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = MESSAGE;

  constructor() {
    super(MESSAGE);

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
