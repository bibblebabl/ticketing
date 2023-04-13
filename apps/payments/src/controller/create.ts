import { Request, Response } from 'express'
import { body } from 'express-validator'
import { Order } from '../models/order'
import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus } from '@bibblebabl/common'

export const createPaymentValidator = [
  body('token').not().isEmpty(),
  body('orderId').not().isEmpty(),
]

export const createPaymentController = async (req: Request, res: Response) => {
  const { token, orderId } = req.body

  const order = await Order.findById(orderId)

  if (!order) {
    throw new NotFoundError()
  }

  if (order.userId !== req.currentUser?.id) {
    throw new NotAuthorizedError()
  }

  if (order.status === OrderStatus.Cancelled) {
    throw new BadRequestError('Cannot pay for an cancelled order')
  }

  res.status(201).send({ success: true })
}
