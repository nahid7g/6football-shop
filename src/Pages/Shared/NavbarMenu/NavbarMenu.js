import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/actionCreators/userActions'

const NavbarMenu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          6Football Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={Link} to='/cart'>
              <FaShoppingCart />
              <span className='ms-1'>Cart</span>
            </Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <NavDropdown.Item as={Link} to='/profile'>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to='/login'>
                <FaUserAlt />
                <span className='ms-1'>Sign In</span>
              </Nav.Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <NavDropdown.Item as={Link} to='admin/user-list'>
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/product-list'>
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/order-list'>
                  Orders
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarMenu
