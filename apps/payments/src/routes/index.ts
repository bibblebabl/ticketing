import { requireAuth, validateRequest } from '@bibblebabl/common'
import express from 'express'
import { newPaymentController, newPaymentValidator } from '../controller/new'

const paymentsRouter = express.Router()

paymentsRouter.post('/', requireAuth, (req, res) => {
  console.log(req)
})

export { paymentsRouter }
