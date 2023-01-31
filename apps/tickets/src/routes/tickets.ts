import { requireAuth, validateRequest } from '@bibblebabl/common'
import { body } from 'express-validator'
import express, { Response, Request } from 'express'
import { Ticket } from '../models/ticket'

const ticketsRouter = express.Router()

ticketsRouter.post(
  '/',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body

    const ticket = new Ticket({
      title,
      price,
      userId: req.currentUser!.id,
    })

    await ticket.save()

    res.status(201).send(ticket)
  },
)

export { ticketsRouter }
