import mongoose, { Document } from 'mongoose'

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

const User = mongoose.model<IUser>('User', userSchema)

export { User }
