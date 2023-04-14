import { NextPageContext } from 'next'
import { buildClient } from '../../api/build-client'
import { Order } from '../../types'
import { useEffect, useState } from 'react'
import { useRequest } from '../../hooks/use-request'
import Router from 'next/router'

const OrderView = ({ order }: { order: Order }) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const { makeRequest, errors } = useRequest(
    {
      url: '/api/payments',
      method: 'post',
      data: {
        orderId: order.id,
      },
    },
    () => Router.push('/orders'),
  )

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime()
      setTimeLeft(Math.round(msLeft / 1000))
    }

    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [order])

  if (timeLeft < 0) {
    return <div>Order Expired</div>
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      {/* <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_FlLFVapGHTly3FicMdTU06SC006tWtWbNH"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      /> */}
      {!!errors.length && (
        <div className="alert alert-danger">
          <h4>Oopss...</h4>
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

OrderView.getInitialProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx)
  const { id } = ctx.query
  const { data } = await client.get(`/api/orders/${id}`)

  return { order: data }
}

export default OrderView
