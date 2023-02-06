import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import Message from '../../components/Message'
import { Button, Nav, Table } from 'react-bootstrap'
import { ordersList } from '../../redux/actionCreators/orderActions'
import { FaCheckCircle, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const OrderList = () => {
  const dispatch = useDispatch()

  const allOrderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = allOrderList

  useEffect(() => {
    dispatch(ordersList())
  }, [dispatch])

  return (
    <>
      <h2>Orders</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isDelivered ? (
                    <span>
                      <FaCheckCircle />
                    </span>
                  ) : (
                    <span className='text-danger'>
                      <FaTimes />
                    </span>
                  )}
                </td>
                <td>
                  <Nav.Link as={Link} to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </Nav.Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderList
