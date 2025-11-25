// React modules
import { Link } from 'react-router-dom';
import { useState } from 'react';
// Redux modules
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../../slices/products/productThunks';
// Icons
import { FaTimes, FaPencilAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
// Local modules
import * as styles from './ProductItem.css'

const ProductItem = ({product, isAdmin, isAuth, handleDelete}) => {
  const { id, name, desc, image, price } = product;
  const [favourite, setFavourite] = useState(false)

  const toggleFav = (e) => {
    e.preventDefault()
    setFavourite(!favourite)
  }

  return (
    <div className={`card ${styles.cardSize}`}>
      <img src={image} className={styles.cardImage} alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{desc}</p>
        <p className="card-text">${price}</p>
      </div>
      <div className={styles.favStar} onClick={toggleFav}>
        Favourite: { favourite ?
          <FaStar color='red' size='2em'/> : <FaRegStar color='red' size='2em'/>}
      </div>
      <div className="d-grid card-footer bg-secondary-subtle gap-3">
        {/* Admin Buttons */}
        { isAdmin && isAuth ? (
          <IconContext.Provider value={{ size: '2em'}}>
            <Link to={`/edit/${id}`}>
              <button
                type='button'
                className='btn btn-warning p-3 text-primary fw-bold' >
                <FaPencilAlt /> Edit
              </button>
            </Link>
            <button
              type='button'
              className='btn btn-info text-danger p-3 fw-bold'
              onClick={(e) => handleDelete(id, e) } >
              <FaTimes />Delete
            </button>
          </IconContext.Provider>
          ) : (<div> Service Footer </div>)
        }
      </div>
    </div>
  )
}

export default ProductItem
