import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutFormInner, { CheckoutFormInnerProps } from './checkout-form-inner'

const stripePromise = loadStripe(
  'pk_test_51MwU0xKhbFECNlrEVbeS1BOcxoMh9X5IxoYyboIFxnuN6RW68FhvQC3lH13JECtj6AkolWwH9r0bqOjz7Rsh8qBK004GmWjvr8',
)

type CheckoutFormProps = CheckoutFormInnerProps

const CheckoutForm = (props: CheckoutFormProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner {...props} />
    </Elements>
  )
}

export default CheckoutForm
