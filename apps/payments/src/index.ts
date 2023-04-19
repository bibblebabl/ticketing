import 'express-async-errors'
import mongoose from 'mongoose'
import { app } from './app'
import { env } from './config'
import { natsWrapper } from './nats-wrapper'
import { OrderCreatedListener } from './events/listeners/order-created-listener'
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener'

const start = async () => {
  try {
    await natsWrapper.connect(env.NATS_CLUSTER_ID, env.NATS_CLIENT_ID, env.NATS_URL)

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!')
      process.exit()
    })

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    new OrderCreatedListener(natsWrapper.client).listen()
    new OrderCancelledListener(natsWrapper.client).listen()

    await mongoose.connect(env.MONGO_URI)
    console.log('Connected to Payments MongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log(`Payments Server listening on ${3000}`)
  })
}

start()
