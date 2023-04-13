import { Request, Response } from 'express'
import { body } from 'express-validator'

export const createPaymentValidator = [
  body('token').not().isEmpty(),
  body('orderId').not().isEmpty(),
]

export const createPaymentController = async (req: Request, res: Response) => {
  res.send({ success: true })
}
