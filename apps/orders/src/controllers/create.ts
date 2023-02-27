import { BadRequestError, NotFoundError, OrderStatus } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { Order } from '../models/order'
import { Ticket } from '../models/ticket'

const EXPIRATION_WINDOW_SECONDS = 15 * 60 * 1000 // 15 minutes

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
  const isReserved = await ticket.isReserved()

  if (isReserved) {
    throw new BadRequestError('Ticket is already reserved')
  }

  // Calculate an expiration date for this order
  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

  const order = new Order({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket,
  })

  await order.save()

  res.status(201).send(order)
}
