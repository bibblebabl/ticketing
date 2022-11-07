import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'

import mongoose from 'mongoose'

import { usersRouter } from './routes/users'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors'

const config = {
  port: 3000,
  mongoDbUri: 'mongodb://auth-mongo-srv:27017/auth',
}

const app = express()
app.use(json())

app.use('/api/users', usersRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const init = async () => {
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
