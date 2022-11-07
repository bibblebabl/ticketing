import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'
import { BadRequestError } from '../errors'

const HASH_ROUNDS = 10

interface IUser extends Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(HASH_ROUNDS)
    const hashed = await bcrypt.hash(this.password, salt)
    this.set('password', hashed)
    return next()
  } catch (error) {
    throw new BadRequestError('Error with saving User Data')
  }
})

const User = mongoose.model<IUser>('User', userSchema)

export { User }
