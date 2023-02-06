import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, usersList } from '../../redux/actionCreators/userActions'
import Loading from '../../components/Loading'
import Message from '../../components/Message'
import { Button, Nav, Table } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaTimes, FaEdit, FaTrash } from 'react-icons/fa'

const UserList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.usersList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: deleteSuccess } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(usersList())
    } else {
      navigate('/')
    }
  }, [dispatch, userInfo, navigate, userDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <>
      <h2>Users</h2>
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
              <th>Email</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
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
                  <Nav.Link to={`/admin/user/${user._id}/edit`} as={Link}>
                    <Button variant='light' className='btn-sm'>
                      <span>
                        <FaEdit />
                      </span>
                    </Button>
                  </Nav.Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
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

export default UserList
