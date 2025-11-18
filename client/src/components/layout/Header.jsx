// Snippet rafce - tsrafce
// import PropTypes from 'prop-types';
import { Link } from 'react-router';

import {FaHome, FaQuestion, FaPlus } from 'react-icons/fa';
import { GiFlowerPot } from "react-icons/gi";
import { IconContext } from 'react-icons/lib';


const Header = ({ branding = "My App" }) => {
  
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
              <Link className="nav-link" to="/add-product"><FaPlus />Add Product</Link>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </nav>
  );
  // We should not use <a> tags in a JSX component.

  
}

// Header.propTypes = {
//     branding: PropTypes.string
// }

export default Header;
