import { apIRoute, app } from '../../app'
import request from 'supertest'
import { createMongooseId, signIn } from '../../../test/helpers'

it('returns an error if the ticket does not exist', async () => {
  const ticketId = createMongooseId()
  await request(app).post(apIRoute).set('Cookie', signIn()).send({ ticketId }).expect(404)
})

it('returns an error if the ticket is already reserved', async () => {})

it('reserves a ticket', async () => {})
