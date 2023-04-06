import { env } from './config'
import { OrderCreatedListener } from './listeners/order-created-listener'
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

    // await new OrderCreatedListener(natsWrapper.client).listen()
    new OrderCreatedListener(natsWrapper.client).listen()
  } catch (error) {
    console.error(error)
  }
}

start()
