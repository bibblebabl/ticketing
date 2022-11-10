import express from 'express'
import { currentUserController } from '../controllers/current-user'
import { signInController } from '../controllers/sign-in'
import { signOutController } from '../controllers/sign-out'
import { signUpController } from '../controllers/sign-up'
import { signInValidator } from '../validators/sign-in'
import { signUpValidator } from '../validators/sign-up'

const usersRouter = express.Router()

usersRouter.get('/currentuser', currentUserController)

usersRouter.post('/signout', signOutController)

usersRouter.post('/signin', signInValidator, signInController)

usersRouter.post('/signup', signUpValidator, signUpController)

export { usersRouter }
