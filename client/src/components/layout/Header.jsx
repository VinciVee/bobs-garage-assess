// React* modules
import { Link } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { IconContext } from 'react-icons/lib'
import { MdDarkMode, MdLightMode  } from "react-icons/md";
import { Container, DropdownButton, Nav, Navbar, NavDropdown, ToggleButton } from 'react-bootstrap';
// Redux modules
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout, getIsAuth, getIsAdmin } from '../../slices/auth/authSlice'
// Local modules
import * as styles from './Header.css'


const Header = ({ branding = "Bob&apos;s Garage" }) => {
  const dispatch = useDispatch()
  const isAdmin = useSelector(getIsAdmin)
  const isAuth = useSelector(getIsAuth)
  const [darkMode, setDarkMode] = useState(true);

  const leave=(e)=>{
    console.log('Logout click, e: ', e.target)
    dispatch(logout())
  }

  const handleClick=(e)=>{
    // Switch themes
    setDarkMode(!darkMode)
  }

  // Admin Dashboard
  const userLinks = (
    <NavDropdown
      title={<FaCircleUser />}
      id="userAccount"
      drop='down'
      align={'end'}
      autoClose={true}
    >
      { isAdmin?
        <NavDropdown.Item as={Link} to="/admin">Dashboard</NavDropdown.Item>
        : null
      }
      <NavDropdown.Item onClick={leave}>Logout</NavDropdown.Item>
    </NavDropdown>
  )
  // Register and Login
  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/login">Login</Nav.Link>
      <Nav.Link as={Link} to="/register">Register</Nav.Link>
    </Nav>
  )

  return (
    <header>
      <Navbar
        expand="md"
        bg="dark"
        data-bs-theme="dark">
        <Container className={styles.headerLayout}>
          <Navbar.Brand as={Link} to="/">Bob&apos;s Garage</Navbar.Brand>
          <Navbar.Toggle autoclose="outside"/>
          <Navbar.Collapse id="basic-navbar-nav" className={styles.navCollapse}>
            <Nav>
              {/* Links for everyone */}
              <Nav.Link as={Link} to="/products">Services</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>

              {/* Links for logged-in users*/}
              { isAuth? userLinks : authLinks }

              {/* Theme switch */}
              <IconContext.Provider value={{ className: styles.themeIcons, size:'1.5em' }}>
                <ToggleButton onClick={handleClick} className={styles.themeButton}>
                  { darkMode?
                    <MdDarkMode /> :
                    <MdLightMode /> }
                </ToggleButton>
              </IconContext.Provider>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
