import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loading from '../../components/Loading'
import { useParams } from 'react-router-dom'
import {
  getUserDetails,
  updateUser,
} from '../../redux/actionCreators/userActions'
import { USER_UPDATE_RESET } from '../../redux/actionTypes/userActions'

const UserEdit = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/user-list')
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, navigate, user, id, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: id, name, email, isAdmin }))
  }
  return (
    <>
      <Link to='/admin/user-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit User</h2>
        {updateLoading && <Loading />}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEdit
