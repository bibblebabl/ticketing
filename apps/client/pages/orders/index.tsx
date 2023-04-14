import { NextPageContext } from 'next'
import { buildClient } from '../../api/build-client'
import { Order } from '../../types'

const OrdersPage = ({ orders }: { orders: Order[] }) => {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        )
      })}
    </ul>
  )
}

OrdersPage.getInitialProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx)
  const { data } = await client.get('/api/orders')

  return { orders: data }
}

export default OrdersPage
