// Bring in some icons that we will use, for edit and delete
import { Link } from 'react-router';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import * as styles from './SingleProduct.css'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../slices/productSlice';

const SingleProduct = ({flower}) => {
  const dispatch = useDispatch()

  const onDelete = (id, e) => {
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


  const { prodId, name, desc, image, price } = flower;
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
              <IconContext.Provider value={{ size: '2em'}}>
                <Link to={`/edit/${prodId}`}>
                  <button type='button' className='btn btn-warning p-3 text-primary fw-bold'>
                    <FaPencilAlt /> Edit
                  </button>
                </Link>
                <button type='button' className='btn btn-info text-danger p-3 fw-bold' onClick={e => onDelete(prodId, e) }>
                  <FaTimes /> Delete
                </button>
              </IconContext.Provider>
            </div>
        </div>
    </div>
  )
}

export default SingleProduct;
