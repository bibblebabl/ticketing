import express from "express";
import { body } from "express-validator";
import { currentUserController } from "../controllers/current-user";
import { signInController } from "../controllers/sign-in";
import { signOutController } from "../controllers/sign-out";
import { signUpController } from "../controllers/sign-up";

const usersRouter = express.Router();

usersRouter.get("/currentuser", currentUserController);

usersRouter.post("/signin", signInController);

usersRouter.post("/signout", signOutController);

usersRouter.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  signUpController
);

export { usersRouter };
