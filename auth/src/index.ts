import 'express-async-errors'

import mongoose from 'mongoose'
import { app } from './app'

const config = {
  port: 3000,
  mongoDbUri: 'mongodb://auth-mongo-srv:27017/auth',
}

const start = async () => {
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

start()
