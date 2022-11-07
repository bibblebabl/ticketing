import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors'
import { User } from '../models/user'

export const signUpController = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    console.log('Email in use')
    return res.send({})
  }

  const user = new User({
    email,
    password,
  })

  await user.save()

  res.status(201).send(user)
}
