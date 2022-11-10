import { Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError } from '../errors'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'

export const signUpValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
]

export const signUpController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const user = new User({ email, password })

  await user.save()

  // generate jwt
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,
  )

  req.session = {
    jwt: userJwt,
  }

  res.status(201).send(user)
}
