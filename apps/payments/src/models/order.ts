import { OrderStatus } from '@bibblebabl/common'
import { Model, Document, Schema } from 'mongoose'

interface OrderAttrs {
  id: string
  status: OrderStatus
  userId: string
  version: number
  price: number
}

interface OrderDoc extends Document {}

interface OrderModel extends Model<OrderDoc> {}

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created,
  },
})
