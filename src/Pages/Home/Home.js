import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../../components/Product'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { listProducts } from '../../redux/actionCreators/productActions'
import Loading from '../../components/Loading'
import Message from '../../components/Message'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  return (
    <>
      <Row>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  )
}

export default Home
