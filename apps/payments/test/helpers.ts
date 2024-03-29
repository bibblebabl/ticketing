import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

export const generateMongooseId = () => {
  return new mongoose.Types.ObjectId().toHexString()
}

export const signIn = (id?: string) => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: id || generateMongooseId(),
    email: 'test@test.com',
  }

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token }

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`]
}
