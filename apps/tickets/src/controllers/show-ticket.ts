import { NotFoundError } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { Ticket } from '../models/ticket'

export const showTicketController = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    throw new NotFoundError()
  }

  res.send(ticket)
}
