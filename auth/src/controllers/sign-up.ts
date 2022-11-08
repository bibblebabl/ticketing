import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { BadRequestError, RequestValidationError } from '../errors'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'

export const signUpController = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

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
    'kdjsd',
  )

  req.session = {
    jwt: userJwt,
  }

  res.status(201).send(user)
}
