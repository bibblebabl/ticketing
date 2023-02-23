import 'express-async-errors'
import mongoose from 'mongoose'
import { app } from './app'
import { env } from './config'
import { natsWrapper } from './nats-wrapper'

const start = async () => {
  try {
    await natsWrapper.connect(env.NATS_CLUSTER_ID, env.NATS_CLIENT_ID, env.NATS_URL)

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!')
      process.exit()
    })

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

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
