import { BadRequestError, NotFoundError, OrderStatus } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { Order } from '../models/order'
import { Ticket } from '../models/ticket'

export const ticketValidator = [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Ticket must be provided'),
]

export const createOrderController = async (req: Request, res: Response) => {
  const { ticketId } = req.body

  const ticket = await Ticket.findById(ticketId)

  if (!ticket) {
    throw new NotFoundError()
  }

  // Make sure that this ticket is not already reserved
  // Run query to look at all orders. Find an order where the ticket
  // is the ticket we just found *and* the orders status is *not* cancelled.
  // If we find an order from that means the ticket *is* reserved

  // const isReserved = await ticket.isReserved()
  const existingOrder = await Order.findOne({
    ticket,
    status: {
      $in: [OrderStatus.Created, OrderStatus.AwaitingPayment, OrderStatus.Complete],
    },
  })

  if (existingOrder) {
    throw new BadRequestError('Ticket is already reserved')
  }

  // Calculate an expiration date for this order
  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + 15 * 60)
}
