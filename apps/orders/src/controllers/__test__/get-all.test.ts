import request from 'supertest'
import { signIn } from '../../../test/helpers'
import { apIRoute, app } from '../../app'
import { Ticket } from '../../models/ticket'

it('fetches orders for a particular user', async () => {
  // Create three tickets
  const ticketOne = new Ticket({
    title: 'Ticket #1',
    price: 20,
  })
  await ticketOne.save()

  const ticketTwo = new Ticket({
    title: 'Ticket #2',
    price: 30,
  })
  await ticketTwo.save()

  const ticketThree = new Ticket({
    title: 'Ticket #3',
    price: 40,
  })
  await ticketThree.save()

  const userOne = signIn()
  const userTwo = signIn()

  // Create one order as User #1

  const { body: orderOne } = await request(app)
    .post(apIRoute)
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201)

  // Create two orders as User #2

  const { body: orderTwo } = await request(app)
    .post(apIRoute)
    .set('Cookie', userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201)

  const { body: orderThree } = await request(app)
    .post(apIRoute)
    .set('Cookie', userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201)

  // Make request to get orders for User #2

  const { body: userTwoOrders } = await request(app)
    .get(apIRoute)
    .set('Cookie', userTwo)
    .expect(200)

  // Make sure we only got the orders for User #2

  expect(userTwoOrders.length).toEqual(2)
  expect(userTwoOrders[0].id).toEqual(orderTwo.id)
  expect(userTwoOrders[1].id).toEqual(orderThree.id)
  expect(userTwoOrders[0].ticket.id).toEqual(ticketTwo.id)
  expect(userTwoOrders[1].ticket.id).toEqual(ticketThree.id)
})
