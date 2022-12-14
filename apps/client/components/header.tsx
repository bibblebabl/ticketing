import Link from 'next/link'
import { UserPayload } from '../types/user'

export const Header = ({ currentUser }: { currentUser: UserPayload | null }) => {
  console.log(currentUser)
  const links = [
    {
      label: 'Sign up',
      href: '/auth/sign-up',
      show: !Boolean(currentUser),
    },
    {
      label: 'Sign in',
      href: '/auth/sign-in',
      show: !Boolean(currentUser),
    },
    {
      label: 'Sign Out',
      href: '/auth/sign-out',
      show: Boolean(currentUser),
    },
  ]

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        Ticketing
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links.map((el) => {
            if (el.show) {
              return (
                <li key={el.href} className="nav-item">
                  <Link href={el.href}>{el.label}</Link>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </nav>
  )
}
