import express from 'express'
import { createOrderController } from '../controllers/create'
import { deleteOrderController } from '../controllers/delete'
import { getOrderController } from '../controllers/get'
import { getOrdersController } from '../controllers/get-all'

const ordersRouter = express.Router()

ordersRouter.get('/', getOrdersController)
ordersRouter.delete('/:orderId', deleteOrderController)
ordersRouter.get('/:orderId', getOrderController)
ordersRouter.post('/', createOrderController)

export { ordersRouter }
