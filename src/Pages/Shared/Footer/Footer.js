import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <Container className='text-center'>
      <p>&copy;{year} || All rights reserved by 6football-shop.</p>
    </Container>
  )
}

export default Footer
