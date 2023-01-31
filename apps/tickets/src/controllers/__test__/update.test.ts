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
