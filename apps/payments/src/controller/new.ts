import { Request, Response } from 'express'
import { body } from 'express-validator'

export const newPaymentValidator = [body('token').not().isEmpty(), body('orderId').not().isEmpty()]

export const newPaymentController = async (req: Request, res: Response) => {
  res.send({ success: true })
}
