import 'express-async-errors'
import mongoose from 'mongoose'
import { app } from './app'
import { env } from './config'
import { TicketCreatedListener } from './events/listeners/ticket-created-listener'
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener'
import { natsWrapper } from './nats-wrapper'
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener'
import { PaymentCreatedListener } from './events/listeners/payment-created-listener'

const start = async () => {
  try {
    await natsWrapper.connect(env.NATS_CLUSTER_ID, env.NATS_CLIENT_ID, env.NATS_URL)

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!')
      process.exit()
    })

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    new TicketCreatedListener(natsWrapper.client).listen()
    new TicketUpdatedListener(natsWrapper.client).listen()
    new ExpirationCompleteListener(natsWrapper.client).listen()
    new PaymentCreatedListener(natsWrapper.client).listen()

    await mongoose.connect(env.MONGO_URI)
    console.log('Connected to Orders MongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log(`Auth Server listening on ${3000}`)
  })
}

start()
