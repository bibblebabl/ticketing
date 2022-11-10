import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const currentUserController = (req: Request, res: Response) => {
  res.send({
    currentUser: req.currentUser || null,
  })
}
