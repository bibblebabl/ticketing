import { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError, RequestValidationError } from "../errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof DatabaseConnectionError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: err.message || "Something went wrong" }],
  });
};
