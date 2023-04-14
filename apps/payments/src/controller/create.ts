import { Request, Response } from 'express'
import { body } from 'express-validator'
import { Order } from '../models/order'
import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus } from '@bibblebabl/common'
import { stripe } from '../stripe'
import { Payment } from '../models/payment'
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher'
import { natsWrapper } from '../nats-wrapper'

export const createPaymentValidator = [
  body('paymentMethod').not().isEmpty(),
  body('orderId').not().isEmpty(),
]

export const createPaymentController = async (req: Request, res: Response) => {
  const { paymentMethod, orderId } = req.body

  const order = await Order.findById(orderId)

  if (!order) {
    throw new NotFoundError()
  }

  if (order.userId !== req.currentUser?.id) {
    throw new NotAuthorizedError()
  }

  if (order.status === OrderStatus.Cancelled) {
    throw new BadRequestError('Cannot pay for an cancelled order')
  }

  const paymentIntent = await stripe.paymentIntents.create({
    currency: 'usd',
    amount: order.price * 100,
    payment_method: paymentMethod,
    confirm: true,
  })

  const payment = Payment.build({
    orderId,
    stripeId: paymentIntent.id,
  })

  await payment.save()

  await new PaymentCreatedPublisher(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.orderId,
    stripeId: payment.stripeId,
  })

  res.status(201).send({ id: payment.id })
}
