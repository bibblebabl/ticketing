import Head from 'next/head'

export default function SignUp() {
  return (
    <div>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Signup to the website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </main>
    </div>
  )
}
