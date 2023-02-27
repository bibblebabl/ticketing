import { OrderStatus } from '@bibblebabl/common'
import request from 'supertest'
import { signIn } from '../../../test/helpers'
import { apIRoute, app } from '../../app'
import { Order } from '../../models/order'
import { Ticket } from '../../models/ticket'

it('marks an order as cancelled', async () => {
  const ticket = new Ticket({
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
