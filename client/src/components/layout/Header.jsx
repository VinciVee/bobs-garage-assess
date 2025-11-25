// React* modules
import { Fragment } from 'react'
import { Link, Links } from 'react-router-dom';
import {FaSignInAlt, FaDoorOpen, FaSignOutAlt, FaUsers } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Container, Nav, Navbar, NavDropdown, ToggleButton } from 'react-bootstrap';
// Other modules
import PropTypes from 'prop-types';
// Redux modules
import { useDispatch, useSelector } from 'react-redux'
import { logout, getIsAuth, getIsAdmin } from '../../slices/auth/authSlice'
// Local modules
import * as styles from './Header.css'
import BgCheck from '../common/BgCheck'


const Header = ({ branding = "Bob&apos;s Garage" }) => {
  const dispatch = useDispatch()
  const isAdmin = useSelector(getIsAdmin)
  const isAuth = useSelector(getIsAuth)

  const leave=(e)=>{
    console.log('Logout click, e: ', e.target)
    dispatch(logout())
  }

  const handleChange=(e)=>{
    // Switch themes
  }

  // Admin Dashboard
  const userLinks = (
    <NavDropdown title="Admin" id="userAccount">
      { isAdmin? <NavDropdown.Item as={Link} to="/admin">Dashboard</NavDropdown.Item> : null }
      <NavDropdown.Item onClick={leave}>Logout</NavDropdown.Item>
    </NavDropdown>
  )
  // Register and Login
  const authLinks = (
    <Nav.Item>
      <Nav.Link as={Link} to="/login">Login</Nav.Link>
      <Nav.Link as={Link} to="/register">Register</Nav.Link>
    </Nav.Item>
  )

  return (
    <header>
      <Navbar expand="lg" className='bg-body-tertiary' bg="dark" data-bs-theme="dark">
        <Container >
          <Navbar.Brand as={Link} to="/">Bob&apos;s Garage</Navbar.Brand>
          <Navbar.Toggle aria-control="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/products">Services</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              {/* Conditional */}
              { isAuth? userLinks : authLinks }
              <ToggleButton onChange={handleChange}>Theme
                {/* Dark/light switch */}
                {/* {isDarkMode ? 'Light Mode' : 'Dark Mode'} */}
              </ToggleButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
