import { Request, Response } from 'express'

export const signOutController = (req: Request, res: Response) => {
  req.session = {}

  res.send({})
}
