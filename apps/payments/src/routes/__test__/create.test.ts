import request from 'supertest'
import { app } from '../../app'
import { generateMongooseId, signIn } from '../../../test/helpers'
import { Order } from '../../models/order'
import { OrderStatus } from '@bibblebabl/common'
import { stripe } from '../../stripe'
import { Payment } from '../../models/payment'

const apiUrl = '/api/payments'

const paymentMethod = 'pm_card_visa'

it('returns a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post(apiUrl)
    .set('Cookie', signIn())
    .send({
      paymentMethod,
      orderId: generateMongooseId(),
    })
    .expect(404)
})

it('returns a 401 when purchasing an order that does not belong to the user', async () => {
  const order = await Order.build({
    id: generateMongooseId(),
    userId: generateMongooseId(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  })

  await order.save()

  await request(app)
    .post(apiUrl)
    .set('Cookie', signIn())
    .send({
      paymentMethod,
      orderId: order.id,
    })
    .expect(401)
})

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = generateMongooseId()
  const order = await Order.build({
    id: generateMongooseId(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  })

  await order.save()

  await request(app)
    .post(apiUrl)
    .set('Cookie', signIn(userId))
    .send({
      paymentMethod,
      orderId: order.id,
    })
    .expect(400)
})

it('returns a 204 with valid inputs', async () => {
  const userId = generateMongooseId()
  const price = Math.floor(Math.random() * 100000)

  const order = await Order.build({
    id: generateMongooseId(),
    userId,
    version: 0,
    price,
    status: OrderStatus.Created,
  })

  await order.save()

  await request(app)
    .post(apiUrl)
    .set('Cookie', signIn(userId))
    .send({
      paymentMethod,
      orderId: order.id,
    })
    .expect(201)

  const paymentIntents = await stripe.paymentIntents.list({ limit: 50 })

  const stripePaymentIntent = paymentIntents.data.find((intent) => intent.amount === price * 100)

  expect(stripePaymentIntent).toBeDefined()
  expect(stripePaymentIntent?.currency).toEqual('usd')

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripePaymentIntent?.id,
  })

  expect(payment).not.toBeNull()
})
