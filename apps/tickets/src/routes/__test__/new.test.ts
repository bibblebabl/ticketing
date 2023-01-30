import request from 'supertest'
import { app } from '../../app'

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({})
  expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {})

it('returns a status other than 401 if the user is signed in', async () => {})

it('returns an error if an invalid title is provided', async () => {})

it('returns an error if an invalid price is provided', async () => {})
