import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

type CustomError = { message: string; field?: string }

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<CustomError[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(email, password)

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      })
      console.log(response)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data)
        setErrors(error.response.data?.errors)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Signup to the website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              value={email}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
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
