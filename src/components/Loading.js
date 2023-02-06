import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='d-flex justify justify-content-center align-items-center'>
      <Spinner animation='border' variant='primary' />
    </div>
  )
}

export default Loading
