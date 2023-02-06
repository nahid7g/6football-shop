import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../redux/actionCreators/productActions'
import Loading from '../../components/Loading'
import Message from '../../components/Message'
import { Button, Nav, Table, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa'
import { PRODUCT_CREATE_RESET } from '../../redux/actionTypes/productListActions'

const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin
  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
    product: createdProduct,
  } = productCreate

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = productDelete

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/')
    }
    if (createSuccess) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    deleteSuccess,
    createSuccess,
    createdProduct,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }
  const createProductHandler = () => {
    dispatch(createProduct())
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlusCircle />
            Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loading />}
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {createLoading && <Loading />}
      {createError && <Message variant='danger'>{createError}</Message>}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Nav.Link to={`/admin/product/${product._id}/edit`} as={Link}>
                    <Button variant='light' className='btn-sm'>
                      <span>
                        <FaEdit />
                      </span>
                    </Button>
                  </Nav.Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <span>
                      <FaTrash />
                    </span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductList
