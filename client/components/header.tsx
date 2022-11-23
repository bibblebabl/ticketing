import Link from 'next/link'
import { UserPayload } from '../types/user'

export const Header = ({ currentUser }: { currentUser: UserPayload | null }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        Ticketing
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          <button className="btn">{currentUser ? 'Sign Out ' : 'Sign In'}</button>
        </ul>
      </div>
    </nav>
  )
}
