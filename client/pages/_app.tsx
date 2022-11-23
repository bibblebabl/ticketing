// import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import type { AppContext, AppProps } from 'next/app'
import { buildClient } from '../api/build-client'
import { Header } from '../components/header'
import { UserPayload } from '../types/user'

const AppComponent = ({
  Component,
  pageProps,
  currentUser,
}: AppProps & { currentUser: UserPayload | null }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  )
}

AppComponent.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const client = buildClient(ctx)
  const {
    data,
  }: {
    data: {
      currentUser: UserPayload | null
    }
  } = await client.get('/api/users/currentuser')
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  return {
    pageProps,
    currentUser: data,
  }
}

export default AppComponent
