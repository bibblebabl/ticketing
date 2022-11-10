import { Request, Response } from 'express'
import { body } from 'express-validator'

export const signInValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password'),
]

export const signInController = (req: Request, res: Response) => {}
