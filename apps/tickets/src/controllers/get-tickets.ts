import { Response, Request } from 'express'
import { Ticket } from '../models/ticket'

export const getTicketsController = async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  })

  res.send(tickets)
}
