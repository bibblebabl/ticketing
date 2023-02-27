import { requireAuth } from '@bibblebabl/common'
import express from 'express'
import { createOrderController, ticketValidator } from '../controllers/create'
import { deleteOrderController } from '../controllers/delete'
import { getOrderController } from '../controllers/get'
import { getOrdersController } from '../controllers/get-all'

const ordersRouter = express.Router()

ordersRouter.get('/', requireAuth, getOrdersController)

ordersRouter.post('/', requireAuth, ticketValidator, createOrderController)

ordersRouter.get('/:orderId', requireAuth, getOrderController)

ordersRouter.delete('/:orderId', deleteOrderController)

export { ordersRouter }
