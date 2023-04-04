import request from 'supertest'
import { generateMongooseId, signIn } from '../../../test/helpers'
import { apIRoute, app } from '../../app'
import { Ticket } from '../../models/ticket'

it('fetches the order', async () => {
  const ticket = Ticket.build({
    id: generateMongooseId(),
    title: 'concert',
    price: 20,
  })

  await ticket.save()

  const user = signIn()

  const { body: order } = await request(app)
    .post(apIRoute)
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)

  const { body: fetchedOrder } = await request(app)
    .get(`${apIRoute}/${order.id}`)
    .set('Cookie', user)
    .expect(200)

  expect(fetchedOrder.id).toEqual(order.id)
})

it('returns an error if one user tries to fetch another users order', async () => {
  const ticket = Ticket.build({
    id: generateMongooseId(),
    title: 'concert',
    price: 20,
  })

  await ticket.save()

  const user = signIn()

  const { body: order } = await request(app)
    .post(apIRoute)
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)

  const anotherUser = signIn()

  await request(app).get(`${apIRoute}/${order.id}`).set('Cookie', anotherUser).expect(401)
})
