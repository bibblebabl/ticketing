import { requireAuth, validateRequest } from '@bibblebabl/common'
import express from 'express'
import { createPaymentController, createPaymentValidator } from '../controller/create'

const paymentsRouter = express.Router()

paymentsRouter.post(
  '/',
  requireAuth,
  createPaymentValidator,
  validateRequest,
  createPaymentController,
)

export { paymentsRouter }
