import { cleanEnv, str } from 'envalid'
import dotenv from 'dotenv-safe'

dotenv.config()

export const env = cleanEnv(process.env, {
  JWT_KEY: str(),
  MONGO_URI: str(),
  NATS_URI: str(),
})
