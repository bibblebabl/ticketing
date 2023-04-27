import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { currentUser, errorHandler, NotFoundError } from '@bibblebabl/common'
import { paymentsRouter } from './routes'

const app = express()

export const apIRoute = '/api/payments'

app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  }),
)
app.use(currentUser)

app.use(apIRoute, paymentsRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
