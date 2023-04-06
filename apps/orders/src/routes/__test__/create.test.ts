import { OrderStatus } from '@bibblebabl/common'
import request from 'supertest'
import { apIRoute, app } from '../../app'
import { generateMongooseId, signIn } from '../../../test/helpers'
import { Ticket } from '../../models/ticket'
import { Order } from '../../models/order'
import { natsWrapper } from '../../nats-wrapper'

it('returns an error if the ticket does not exist', async () => {
  const ticketId = generateMongooseId()
  await request(app).post(apIRoute).set('Cookie', signIn()).send({ ticketId }).expect(404)
})

it('returns an error if the ticket is already reserved', async () => {
  const ticketId = generateMongooseId()

  const ticket = Ticket.build({
    id: ticketId,
    title: 'concert',
    price: 20,
  })

  await ticket.save()

  const order = Order.build({
    ticket,
    userId: '123',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  })

  await order.save()

  await request(app)
    .post(apIRoute)
    .set('Cookie', signIn())
    .send({ ticketId: ticket.id })
    .expect(400)
})

it('reserves a ticket', async () => {
  const ticket = Ticket.build({
    id: generateMongooseId(),
    title: 'concert',
    price: 20,
  })

  await ticket.save()

  const order = await request(app)
    .post(apIRoute)
    .set('Cookie', signIn())
    .send({ ticketId: ticket.id })
    .expect(201)

  expect(order.body.ticket.id).toEqual(ticket.id)
})

it('emits an order created event', async () => {
  const ticket = Ticket.build({
    id: generateMongooseId(),
    title: 'concert',
    price: 20,
  })

  await ticket.save()

  await request(app)
    .post(apIRoute)
    .set('Cookie', signIn())
    .send({ ticketId: ticket.id })
    .expect(201)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})
