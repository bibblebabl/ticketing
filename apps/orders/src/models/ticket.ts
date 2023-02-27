import { Schema, model } from 'mongoose'

export interface ITicket {
  title: string
  price: number
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
      min: 0,
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
