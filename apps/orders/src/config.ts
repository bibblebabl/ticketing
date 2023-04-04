import { cleanEnv, str } from 'envalid'
import dotenv from 'dotenv-safe'

dotenv.config()

export const QUEUE_GROUP_NAME = 'orders-service'

export const env = cleanEnv(process.env, {
  JWT_KEY: str(),
  MONGO_URI: str(),
  NATS_CLUSTER_ID: str(),
  NATS_CLIENT_ID: str(),
  NATS_URL: str(),
})
