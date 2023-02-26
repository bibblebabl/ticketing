import { requireAuth } from '@bibblebabl/common'
import express from 'express'
import { createOrderController, ticketValidator } from '../controllers/create'
import { deleteOrderController } from '../controllers/delete'
import { getOrderController } from '../controllers/get'
import { getOrdersController } from '../controllers/get-all'

const ordersRouter = express.Router()

ordersRouter.get('/', getOrdersController)

ordersRouter.post('/', requireAuth, ticketValidator, createOrderController)

ordersRouter.delete('/:orderId', deleteOrderController)

ordersRouter.get('/:orderId', getOrderController)

export { ordersRouter }
