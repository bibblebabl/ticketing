import request from 'supertest'
import { signUp } from '../../../test/helpers'
import { app } from '../../app'

it('response with details about current user', async () => {
  const cookie = await signUp()

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200)

  expect(response.body.currentUser.email).toEqual('test@test.com')
})
