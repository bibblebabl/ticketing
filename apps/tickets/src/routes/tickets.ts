import { requireAuth, validateRequest } from '@bibblebabl/common'
import express from 'express'
import { newTicketController, ticketValidator } from '../controllers/new-ticket'
import { showTicketController } from '../controllers/show-ticket'

const ticketsRouter = express.Router()

ticketsRouter.post('/', requireAuth, ticketValidator, validateRequest, newTicketController)

ticketsRouter.get('/:id', showTicketController)

export { ticketsRouter }
