import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { savePaymentMethod } from '../../redux/actionCreators/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'

const Payment = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  const dispatch = useDispatch()
  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Stripe')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Pay Now</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMehod'
              value='Stripe'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          {/* <Col>
            <Form.Check
              type='radio'
              label='Bkash'
              id='Bkash'
              name='paymentMehod'
              value='Bkash'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type='radio'
              label='Nagad'
              id='Nagad'
              name='paymentMehod'
              value='Nagad'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col> */}
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Payment
