import { requireAuth } from '@bibblebabl/common'
import express from 'express'

const ticketsRouter = express.Router()

ticketsRouter.post('/', requireAuth, (req, res) => {
  res.status(200).send({})
})

export { ticketsRouter }
