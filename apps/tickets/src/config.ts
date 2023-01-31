import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  JWT_KEY: str(),
  MONGO_URI: str(),
})
