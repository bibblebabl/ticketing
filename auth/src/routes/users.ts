import express from "express";

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

usersRouter.post("/signup", (req, res) => {
  res.send("Hi there!");
});

export { usersRouter };
