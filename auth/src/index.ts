import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import mongoose from 'mongoose'

import { usersRouter } from './routes/users'
import { errorHandler } from './middlewares'
import { NotFoundError } from './errors'

const config = {
  port: 3000,
  mongoDbUri: 'mongodb://auth-mongo-srv:27017/auth',
}

const app = express()

app.set('trust proxy', true) // for ingress-nginx
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
)

app.use('/api/users', usersRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const init = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('process.env.JWT_KEY must be defined')
  }

  try {
    await mongoose.connect(config.mongoDbUri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(config.port, () => {
    console.log(`Auth Server listening on ${config.port}`)
  })
}

init()
