import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors'

export const currentUserController = (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null })
  }

  try {
    const userPayload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)

    res.send({ currentUser: userPayload })
  } catch (error) {
    res.send({ currentUser: null })
  }
}
