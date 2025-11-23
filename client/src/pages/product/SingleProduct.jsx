// Bring in some icons that we will use, for edit and delete
import { Link } from 'react-router';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import * as styles from './SingleProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../slices/products/productThunks';
import { getIsAdmin, getIsAuth } from '../../slices/auth/authSlice';

const SingleProduct = ({product}) => {
  const dispatch = useDispatch()
  const isAdmin = useSelector(getIsAdmin)
  const isAuth = useSelector(getIsAuth)

  console.log('SingleProduct.jsx, service object:', product)

  const handleDelete = (id, e) => {
    console.log('onDelete called. SingleProducts.jsx');
    // console.log(`Id clicked: ${id}`);
    // log out our event paramenter
    console.log(e.type);
    try {
      // deleteProduct({id})
      dispatch( deleteProduct(id) ).unwrap()
    } catch (err) {
      console.log('Failed to delete product', err)
    }
  }


  const { id, name, desc, image, price } = product;
  return (
    <div className="col-md-4">
      <div className={`card ${styles.cardSize}`}>
          <img src={image} className={styles.cardImage} alt={name} />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{desc}</p>
              <p className="card-text">${price}</p>
              <a href="#" className="btn btn-primary">Add to cart</a>
            </div>
            <div className="d-grid card-footer bg-secondary-subtle gap-3">
              { isAdmin && isAuth ? (
                <IconContext.Provider value={{ size: '2em'}}>
                  <Link to={`/edit/${id}`}>
                    <button type='button' className='btn btn-warning p-3 text-primary fw-bold'>
                      <FaPencilAlt /> Edit
                    </button>
                  </Link>
                  <button type='button' className='btn btn-info text-danger p-3 fw-bold' onClick={(e) => handleDelete(id, e) }>
                    <FaTimes /> Delete
                  </button>
                </IconContext.Provider>
                ) : (<div> Service Footer </div>)
              }
            </div>
        </div>
    </div>
  )
}

export default SingleProduct;
