import { NotAuthorizedError, NotFoundError } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { Ticket } from '../models/ticket'

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

  await ticket.save()

  res.send(ticket)
}
