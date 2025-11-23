
import PropTypes from 'prop-types';
import { Fragment } from 'react'
import { Link } from 'react-router';

import {FaHome, FaQuestion, FaPlus, FaSignInAlt, FaDoorOpen, FaSignOutAlt, FaUsers } from 'react-icons/fa'
import { GiFlowerPot } from "react-icons/gi"
import { IconContext } from 'react-icons/lib'
import { useDispatch, useSelector } from 'react-redux'
import { logout, getIsAuth, getIsAdmin } from '../../slices/auth/authSlice'


const Header = ({ branding = "My App" }) => {
  const dispatch = useDispatch()

  const isAdmin = useSelector(getIsAdmin)
  const isAuth = useSelector(getIsAuth)

  const leave = (e) => {
    console.log('Logout click, e: ', e.target)
    dispatch(logout())
  }

  // Create variables to store some JSX
  // Admin links
  const adminLinks = (
    <Fragment key={'2'}>
      <Link className='nav-link' to='/add-product'>
        <FaPlus />Add Product</Link>
      <Link className='nav-link' to='/admin'>
        <FaUsers />Admin Dashboard</Link>
    </Fragment>
  )

  // Authlinks
  const authLinks = (
    <Fragment key={'3'}>
      <Link className='nav-link' onClick={leave}><FaSignOutAlt />Logout</Link>
    </Fragment>
  )

  const loginRegisterLinks = (
    <Fragment key={'4'}>
      <Link className='nav-link' to='/login'><FaSignInAlt />Login</Link>
      <Link className='nav-link' to='/register'><FaDoorOpen />Register</Link>
    </Fragment>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{branding}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <IconContext.Provider value={{size: "1.5em" }}>
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active" aria-current="page" to="/"><FaHome /> Home</Link>
              <Link className="nav-link" to="/products"><GiFlowerPot /> Products</Link>
              <Link className="nav-link" to="/about"><FaQuestion /> About</Link>

              {/* Conditional */}
              { (isAdmin && isAuth) ? adminLinks : null }
              { isAuth ? authLinks : loginRegisterLinks }
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </nav>
  );
}

// Header.propTypes = {
//     branding: PropTypes.string
// }

export default Header;
