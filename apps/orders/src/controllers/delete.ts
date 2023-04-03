import { NotAuthorizedError, NotFoundError, OrderStatus } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled'
import { Order } from '../models/order'
import { natsWrapper } from '../nats-wrapper'

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

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    },
  })

  res.status(204).send(order)
}
