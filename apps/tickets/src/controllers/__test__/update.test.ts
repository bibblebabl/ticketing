import request from 'supertest'
import { createMongooseId, signIn } from '../../../test/helpers'
import { app } from '../../app'

it('returns a 404 if the provided id does not exist', async () => {
  const id = createMongooseId()

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', signIn())
    .send({
      title: 'asdf',
      price: 20,
    })
    .expect(404)
})

it('returns a 401 if the user is not authenticated', async () => {
  const id = createMongooseId()

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'asdf',
      price: 20,
    })
    .expect(401)
})

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app).post('/api/tickets').set('Cookie', signIn()).send({
    title: 'asdf',
    price: 20,
  })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', signIn())
    .send({
      title: 'qwer',
      price: 1000,
    })
    .expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = signIn()

  const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
    title: 'asdf',
    price: 20,
  })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'asdf',
      price: -20,
    })
    .expect(400)
})

it('updates the ticket provided valid inputs', async () => {
  const cookie = signIn()

  const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
    title: 'asdf',
    price: 20,
  })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'qwer',
      price: 1000,
    })
    .expect(200)

  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send()

  expect(ticketResponse.body.title).toEqual('qwer')
  expect(ticketResponse.body.price).toEqual(1000)
})
