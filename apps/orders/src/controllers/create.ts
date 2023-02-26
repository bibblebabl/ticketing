import { Response, Request } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

export const ticketValidator = [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Ticket must be provided'),
]

export const createOrderController = async (req: Request, res: Response) => {
  // const tickets = await Ticket.find({})

  // if (!tickets) {
  //   throw new NotFoundError()
  // }

  res.send({})
}
