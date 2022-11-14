import axios, { AxiosRequestConfig, Method } from 'axios'
import { useState } from 'react'

type CustomError = { message: string; field?: string }

export function useRequest(config: AxiosRequestConfig, onSuccess?: (data: any) => void) {
  const [errors, setErrors] = useState<CustomError[]>([])

  const makeRequest = async () => {
    setErrors([])

    try {
      const response = await axios({
        method: config.method,
        url: config.url,
        data: config.data,
      })

      if (onSuccess) {
        onSuccess(response.data)
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors(error.response.data?.errors)
      } else {
        console.log(error)
      }

      throw error
    }
  }

  return {
    errors,
    makeRequest,
  }
}
