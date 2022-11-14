import axios, { Method } from 'axios'
import { useState } from 'react'

type CustomError = { message: string; field?: string }

export function useRequest(url: string, method: Method, body: any) {
  const [errors, setErrors] = useState<CustomError[]>([])

  const makeRequest = async () => {
    setErrors([])

    try {
      const response = await axios({
        method,
        url,
        data: body,
      })

      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors(error.response.data?.errors)
      } else {
        console.log(error)
      }
    }
  }

  return {
    errors,
    makeRequest,
  }
}
