import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  NATS_CLUSTER_ID: str(),
  NATS_CLIENT_ID: str(),
  NATS_URL: str(),
  REDIS_HOST: str(),
})
