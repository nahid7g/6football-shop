import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { saveShippingAddress } from '../../redux/actionCreators/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2>Shipping</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Shipping
