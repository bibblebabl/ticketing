import { NotFoundError } from '@bibblebabl/common'
import { Response, Request } from 'express'
import { Ticket } from '../models/ticket'

export const getTicketsController = async (req: Request, res: Response) => {
  const tickets = await Ticket.find({})

  if (!tickets) {
    throw new NotFoundError()
  }

  res.send(tickets)
}
