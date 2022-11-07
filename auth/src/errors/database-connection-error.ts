export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason = "Error connection to Database";
  constructor() {
    super();

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
