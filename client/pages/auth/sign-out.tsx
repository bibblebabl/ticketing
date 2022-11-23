import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { useRequest } from '../../hooks/use-request'

export default function SignUp() {
  const { makeRequest } = useRequest(
    {
      url: '/api/users/signout',
      method: 'post',
    },
    () => Router.push('/'),
  )

  useEffect(() => {
    makeRequest()
  }, [])

  return <div>Signing you out...</div>
}
