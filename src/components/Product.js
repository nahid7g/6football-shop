import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' style={{ height: '500px' }}>
      <Link to={`product/${product._id}`}>
        <Card.Img
          src={product.image}
          alt={product.name}
          variant='top'
          style={{ height: '250px' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>
              {product.name.length > 40
                ? product.name.slice(0, 70) + '...'
                : product.name}
            </strong>
          </Card.Title>
          <Card.Text as='div'>
            <div className='my-3'>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
          </Card.Text>
          <Card.Text as='h3'>${product.price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Product
