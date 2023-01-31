import { requireAuth, validateRequest } from '@bibblebabl/common'
import { body } from 'express-validator'
import express, { Response, Request } from 'express'

const ticketsRouter = express.Router()

ticketsRouter.post(
  '/',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(200).send({})
  },
)

export { ticketsRouter }
