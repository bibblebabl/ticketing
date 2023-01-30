import { requireAuth } from '@bibblebabl/common'
import express from 'express'
// import { currentUserController } from '../controllers/current-user'
// import { signInController, signInValidator } from '../controllers/sign-in'
// import { signOutController } from '../controllers/sign-out'
// import { signUpController, signUpValidator } from '../controllers/sign-up'
// import { currentUser, validateRequest } from '@bibblebabl/common'

const ticketsRouter = express.Router()

// ticketsRouter.get('/', (req, res) => {})

ticketsRouter.post('/', requireAuth, (req, res) => {
  res.status(200).send({})
})

export { ticketsRouter }
