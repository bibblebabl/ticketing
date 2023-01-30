import 'express-async-errors'
import mongoose from 'mongoose'
import { app } from './app'
import { env } from './config'

const start = async () => {
  try {
    await mongoose.connect(env.MONGO_URI)
    console.log('Connected to Tickets MongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log(`Auth Server listening on ${3000}`)
  })
}

start()
