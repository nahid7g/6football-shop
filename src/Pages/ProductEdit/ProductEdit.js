import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loading from '../../components/Loading'
import { useParams } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../../redux/actionTypes/productListActions'
import { listProductDetails } from '../../redux/actionCreators/productDetailsAction'
import { updateProduct } from '../../redux/actionCreators/productActions'

const ProductEdit = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = productUpdate
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/product-list')
    } else {
      if (!product?.name || product._id !== id) {
        dispatch(listProductDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, navigate, product, id, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        category,
        description,
        image,
        brand,
        countInStock,
      })
    )
  }
  return (
    <>
      <Link to='/admin/product-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit Product</h2>
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {updateLoading && <Loading />}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='price'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>description</Form.Label>
              <Form.Control
                type='text'
                as='textarea'
                rows={3}
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Button className='my-2' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEdit
