import Queue from 'bull'
import { env } from '../config'

interface Payload {
  orderId: string
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: env.REDIS_HOST,
  },
})

expirationQueue.process(async (job) => {
  console.log('I want to publish an expiration:complete event for orderId', job.data.orderId)
})

export { expirationQueue }
