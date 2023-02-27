import { NotAuthorizedError, NotFoundError } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { Order } from '../models/order'

export const getOrderController = async (req: Request, res: Response) => {
  const { orderId } = req.params

  const order = await Order.findById(orderId).populate('ticket')

  if (!order) {
    throw new NotFoundError()
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }

  res.send(order)
}
