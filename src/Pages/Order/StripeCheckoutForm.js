import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from 'react-bootstrap'
import Message from '../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { payOrder } from '../../redux/actionCreators/orderActions'

const StripeCheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('')

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const [stripeError, setStripeError] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('https://6football-shop-server.vercel.app/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({ price: order?.totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [order, userInfo])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    if (card == null) {
      return
    }
    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card,
      })
    if (paymentMethod) {
      paymentMethod.billing_details.name = userInfo?.name
      paymentMethod.billing_details.email = userInfo?.email
      paymentMethod.billing_details.address = order?.shippingAddress
      if (paymentError) {
        setStripeError(paymentError)
      } else {
        setStripeError('')
      }
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: userInfo?.name,
              email: userInfo.email,
            },
          },
        })
      if (confirmError) {
        setStripeError(confirmError)
        return
      }
      dispatch(payOrder(order?._id, paymentMethod))
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {stripeError && (
        <Message variant='danger' className='mt-2'>
          {stripeError.message}
        </Message>
      )}
      <Button
        variant='primary'
        className='mt-2'
        type='submit'
        disabled={!stripe || !clientSecret}
      >
        Pay
      </Button>
    </form>
  )
}

export default StripeCheckoutForm
