import { OrderStatus } from '@bibblebabl/common'
import request from 'supertest'
import { createMongooseId, signIn } from '../../../test/helpers'
import { apIRoute, app } from '../../app'
import { Order } from '../../models/order'
import { Ticket } from '../../models/ticket'
import { natsWrapper } from '../../nats-wrapper'

it('marks an order as cancelled', async () => {
  const ticket = Ticket.build({
    id: createMongooseId(),
    title: 'concert',
    price: 20,
  })

  await ticket.save()

  const user = signIn()

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)

  // make a request to cancel the order
  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204)

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id)

  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled)
})

it('emits a order cancelled event', async () => {
  const ticket = Ticket.build({
    id: createMongooseId(),
    title: 'concert',
    price: 20,
  })

  await ticket.save()

  const user = signIn()

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)

  // make a request to cancel the order
  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})
