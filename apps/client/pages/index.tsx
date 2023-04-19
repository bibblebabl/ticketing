import { NextPageContext } from 'next'
import { buildClient } from '../api/build-client'
import Link from 'next/link'
import { Ticket } from '../types'

const Home = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <div>
      <h2>Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            return (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                  <Link href={`/tickets/${ticket.id}`}>View</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx)
  const { data } = await client.get('/api/tickets')

  return {
    tickets: data,
  }
}

export default Home
