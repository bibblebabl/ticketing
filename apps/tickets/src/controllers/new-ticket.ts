import { Response, Request } from 'express'
import { Ticket } from '../models/ticket'
import { body } from 'express-validator'

export const ticketValidator = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
]

export const newTicketController = async (req: Request, res: Response) => {
  const { title, price } = req.body

  const ticket = new Ticket({
    title,
    price,
    userId: req.currentUser!.id,
  })

  await ticket.save()

  res.status(201).send(ticket)
}
