import { Response, Request } from 'express'
import { Order } from '../models/order'

export const getOrdersController = async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket')

  res.send(orders)
}
