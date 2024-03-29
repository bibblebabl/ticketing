import { requireAuth, validateRequest } from '@bibblebabl/common'
import express from 'express'
import { getTicketsController } from '../controllers/get-tickets'
import { newTicketController, ticketValidator } from '../controllers/new-ticket'
import { showTicketController } from '../controllers/show-ticket'
import { updateTicketController } from '../controllers/update-ticket'

const ticketsRouter = express.Router()

ticketsRouter.get('/', getTicketsController)

ticketsRouter.get('/:id', showTicketController)

ticketsRouter.post('/', requireAuth, ticketValidator, validateRequest, newTicketController)

ticketsRouter.put('/:id', requireAuth, ticketValidator, validateRequest, updateTicketController)

export { ticketsRouter }
