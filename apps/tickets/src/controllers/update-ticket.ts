import { NotAuthorizedError, NotFoundError } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher'
import { Ticket } from '../models/ticket'
import { natsWrapper } from '../nats-wrapper'

export const updateTicketController = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    throw new NotFoundError()
  }

  if (ticket.userId !== req.currentUser?.id) {
    throw new NotAuthorizedError()
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price,
  })

  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  })

  await ticket.save()

  res.send(ticket)
}
