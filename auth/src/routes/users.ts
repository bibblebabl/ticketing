import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError, DatabaseConnectionError } from "../errors";

const usersRouter = express.Router();

usersRouter.get("/currentuser", (req, res) => {
  res.send("Hi there!");
});

usersRouter.post("/signin", (req, res) => {
  res.send("Hi there!");
});

usersRouter.post("/signout", (req, res) => {
  res.send("Hi there!");
});

usersRouter.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log("Creating a user...");
    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { usersRouter };
