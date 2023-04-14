import { useRouter } from 'next/router'

const TicketView = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Ticket {id}</h1>
    </div>
  )
}

export default TicketView
