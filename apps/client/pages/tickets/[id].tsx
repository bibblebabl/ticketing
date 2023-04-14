import Router from 'next/router'
import { buildClient } from '../../api/build-client'
import { AppContext } from 'next/app'
import { NextPageContext } from 'next'

import { useRequest } from '../../hooks/use-request'
import { Order, Ticket } from '../../types'

const TicketView = ({ ticket }: { ticket: Ticket }) => {
  const { makeRequest, errors } = useRequest(
    {
      url: '/api/orders',
      method: 'post',
      data: {
        ticketId: ticket.id,
      },
    },
    (order: Order) => {
      Router.push(`/orders/${order.id}`)
    },
  )

  const handlePurchase = async () => {
    try {
      await makeRequest()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
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
      <button onClick={handlePurchase} type="button" className="btn btn-primary">
        Purchase
      </button>
    </div>
  )
}

TicketView.getInitialProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx)
  const { id } = ctx.query
  const { data } = await client.get(`/api/tickets/${id}`)

  return { ticket: data }
}

export default TicketView
