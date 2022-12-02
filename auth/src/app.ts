import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { usersRouter } from './routes/users'
import { errorHandler, NotFoundError } from '@bibblebabl/common'

const app = express()

app.set('trust proxy', true) // for ingress-nginx
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
)

app.use('/api/users', usersRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
