import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Nav, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import {
  getUserDetails,
  updateUserProfile,
} from '../../redux/actionCreators/userActions'
import Message from '../../components/Message'
import Loading from '../../components/Loading'
import { listMyOrders } from '../../redux/actionCreators/orderActions'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate)
  const { success } = userProfileUpdate

  const orderMyList = useSelector((state) => state.orderMyList)
  const { loading: ordersLoading, error: ordersError, orders } = orderMyList

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user?.name || success) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [user, dispatch, navigate, userInfo, success])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {userProfileUpdate.error && (
          <Message variant='danger'>Something went wrong!</Message>
        )}
        {success && <Message variant='success'>Successfully Updated</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Your Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className='my-2' type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loading />
        ) : ordersError ? (
          <Message variant='danger'>{ordersError}</Message>
        ) : (
          <Table striped bordered hover resopnsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  {
                    <td>
                      {order.isPaid ? (
                        order.paidAt?.substring(0, 10)
                      ) : (
                        <span className='text-danger'>
                          <FaTimes />
                        </span>
                      )}
                    </td>
                  }
                  {
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt?.substring(0, 10)
                      ) : (
                        <span className='text-danger'>
                          <FaTimes />
                        </span>
                      )}
                    </td>
                  }
                  <td>
                    <Nav.Link as={Link} to={`/order/${order._id}`}>
                      <Button variant='light'>Details</Button>
                    </Nav.Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default Profile
