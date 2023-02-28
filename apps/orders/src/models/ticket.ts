import { OrderStatus } from '@bibblebabl/common'
import { Schema, model, Types } from 'mongoose'
import { Order } from './order'

export interface ITicket {
  id: string
  title: string
  price: number
  isReserved(): Promise<boolean>
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
    methods: {
      isReserved: async function () {
        const existingOrder = await Order.findOne({
          ticket: this,
          status: {
            $in: [OrderStatus.Created, OrderStatus.AwaitingPayment, OrderStatus.Complete],
          },
        })

        return Boolean(existingOrder)
      },
      statics: {
        build: (attrs: ITicket) => {
          return new Ticket({
            _id: attrs.id,
            title: attrs.title,
            price: attrs.price,
          })
        },
      },
    },
  },
)

const Ticket = model<ITicket>('Ticket', ticketSchema)

export { Ticket }
