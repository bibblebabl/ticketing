import express from 'express'
import { currentUserController } from '../controllers/current-user'
import { signInController, signInValidator } from '../controllers/sign-in'
import { signOutController } from '../controllers/sign-out'
import { signUpController, signUpValidator } from '../controllers/sign-up'
import { currentUser, validateRequest } from '@bibblebabl/common'

const usersRouter = express.Router()

usersRouter.get('/currentuser', currentUser, currentUserController)

usersRouter.post('/signout', signOutController)

usersRouter.post('/signin', signInValidator, validateRequest, signInController)

usersRouter.post('/signup', signUpValidator, validateRequest, signUpController)

export { usersRouter }
