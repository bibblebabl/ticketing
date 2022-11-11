import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on a successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201)
})

it('returns a 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'skfjddkjfd',
      password: 'password',
    })
    .expect(400)
})

it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'p',
    })
    .expect(400)
})

it('returns a 400 with missing email and password', async () => {
  await request(app).post('/api/users/signup').send({ email: 'test@test.com' }).expect(400)
  await request(app).post('/api/users/signup').send({ password: 'sdsdsjdskjd' }).expect(400)
})
