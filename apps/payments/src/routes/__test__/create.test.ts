import request from 'supertest'
import { app } from '../../app'
import { generateMongooseId, signIn } from '../../../test/helpers'
import { Order } from '../../models/order'
import { OrderStatus } from '@bibblebabl/common'
import { stripe } from '../../stripe'

const apiUrl = '/api/payments'

it('returns a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post(apiUrl)
    .set('Cookie', signIn())
    .send({
      token: 'token',
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
      token: 'token',
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
      token: 'token',
      orderId: order.id,
    })
    .expect(400)
})

it('returns a 204 with valid inputs', async () => {
  const userId = generateMongooseId()
  const price = Math.floor(Math.random() * 100000)
  const token = 'tok_visa'

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
      token,
      orderId: order.id,
    })
    .expect(201)

  const stripeCharges = await stripe.charges.list({ limit: 50 })

  const stripeCharge = stripeCharges.data.find((charge) => {
    return charge.amount === price * 100
  })

  expect(stripeCharge).toBeDefined()
  expect(stripeCharge?.currency).toEqual('usd')
})
