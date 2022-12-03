import { Request, Response } from 'express'

export const signOutController = (req: Request, res: Response) => {
  req.session = null

  res.send({})
}
