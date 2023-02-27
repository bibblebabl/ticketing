import mongoose, { Document, Schema, model } from 'mongoose'

export interface ITicket extends Document {
  title: string
  price: number
  userId: string
}

const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  },
)

const Ticket = model<ITicket>('Ticket', ticketSchema)

export { Ticket }
