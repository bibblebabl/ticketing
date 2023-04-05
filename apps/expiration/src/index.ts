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
  } catch (error) {
    console.error(error)
  }
}

start()
