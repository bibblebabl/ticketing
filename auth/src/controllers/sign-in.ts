import { Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError } from '../errors'
import { User } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signInValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password'),
]

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    throw new BadRequestError('User does not exist')
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password)

  if (!passwordMatch) {
    throw new BadRequestError('Invalid password')
  }

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
  )

  req.session = {
    jwt: userJwt,
  }

  res.status(201).send(existingUser)
}
