import { Request, Response } from "express";

export const signOutController = (req: Request, res: Response) => {
  res.send("Hi there!");
};
