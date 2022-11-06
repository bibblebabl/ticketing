import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    if (!email || typeof email !== "string") {
      res.status(400).send("Provide a valid email");
    }

    console.log("creating a user...");

    res.send({});

    // new User({ email, password })
  }
);

export { usersRouter };
