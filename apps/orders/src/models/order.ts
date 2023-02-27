import { model, Schema, Types } from 'mongoose'
// import bcrypt from 'bcrypt'
import { OrderStatus } from '@bibblebabl/common'
import { ITicket } from './ticket'

interface IOrder {
  userId: string
  status: OrderStatus
  expiresAt: Date
  ticket: ITicket
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: Schema.Types.Date,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
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

const Order = model<IOrder>('Order', orderSchema)

export { Order }
