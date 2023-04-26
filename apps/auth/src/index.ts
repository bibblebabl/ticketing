import 'express-async-errors'
import { cleanEnv, str } from 'envalid'
import mongoose from 'mongoose'
import { app } from './app'

const env = cleanEnv(process.env, {
  JWT_KEY: str(),
  MONGO_URI: str(),
})

const start = async () => {
  console.log('Starting up...')
  if (!process.env.JWT_KEY) {
    throw new Error('process.env.JWT_KEY must be defined')
  }

  try {
    await mongoose.connect(env.MONGO_URI)
    console.log('Connected to Auth MongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log(`Auth Server listening on ${3000}`)
  })
}

start()
