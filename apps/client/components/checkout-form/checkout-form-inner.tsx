import React, { FormEvent } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useRequest } from '../../hooks/use-request'

export interface CheckoutFormInnerProps {
  amount: number
  currency: string
  orderId: string
}

const CheckoutFormInner = ({ amount, currency, orderId }: CheckoutFormInnerProps) => {
  const stripe = useStripe()
  const elements = useElements()

  const { makeRequest, errors } = useRequest(
    {
      url: '/api/payments',
      method: 'post',
      data: {
        orderId,
      },
    },
    (payment) => {
      console.log('Payment successful')
    },
  )

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    })

    if (error) {
      console.error('[error]', error)
    } else {
      try {
        await makeRequest({
          paymentMethod: paymentMethod.id,
        })
      } catch (error) {
        console.error('Payment failed')
        // Handle failed payment
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay {amount / 100} {currency.toUpperCase()}
      </button>
      {errors && (
        <ul>
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
        </ul>
      )}
    </form>
  )
}

export default CheckoutFormInner
