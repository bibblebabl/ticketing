import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongo: any

jest.mock('../src/nats-wrapper')

process.env.STRIPE_KEY =
  'sk_test_51MwU0xKhbFECNlrEH6ZIKIYNJ9sIhzEoIsGPZLOtiA0vwovcaYfkeUK1HTYfJXvGv5qoqcOfk7u7swo35ETjcYBe00btCHcghW'

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop()
  }
  await mongoose.connection.close()
})
