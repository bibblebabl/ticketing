import { Request, Response } from 'express'

export const signInController = (req: Request, res: Response) => {
  res.send('Hi there!')
}
