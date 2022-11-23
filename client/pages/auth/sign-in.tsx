import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import { useRequest } from '../../hooks/use-request'
import Router from 'next/router'

type CustomError = { message: string; field?: string }

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { makeRequest, errors } = useRequest(
    {
      url: '/api/users/signin',
      method: 'POST',
      data: {
        email,
        password,
      },
    },
    () => {
      Router.push('/')
    },
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await makeRequest()
    } catch (error) {}
  }

  return (
    <div>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Signup to the website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              value={email}
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="email"
              placeholder="Enter email"
              autoComplete="true"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              value={password}
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
              autoComplete="true"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </main>
    </div>
  )
}
