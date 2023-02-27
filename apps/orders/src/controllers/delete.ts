import { NotAuthorizedError, NotFoundError, OrderStatus } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { Order } from '../models/order'

export const deleteOrderController = async (req: Request, res: Response) => {
  const { orderId } = req.params

  const order = await Order.findById(orderId).populate('ticket')

  if (!order) {
    throw new NotFoundError()
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }

  order.status = OrderStatus.Cancelled // instead of deleting the order, we mark it as cancelled

  await order.save()

  // await order.delete()

  res.status(204).send(order)
}
