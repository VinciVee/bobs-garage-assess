// Bring in some icons that we will use, for edit and delete
import { Link } from 'react-router';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
// Import the useProductDelete hook from our context
import { useProductDelete } from '../../context/DaisyContext';

const SingleProduct = ({flower}) => {
  // use the useProductDelete hook
  const deleteProduct = useProductDelete(); // give us access to the deleteProduct function in our contextComponent via the provider.
  const onDelete = (id, e) => {
    // test that the function is called
    console.log('onDelete called. SingleProducts.jsx');
    // log out the id.
    console.log(`Id clicked: ${id}`);
    // log out our event paramenter
    console.log(e.type);
    // Call the handle delete function
    deleteProduct(id);
  }

  // We can destructure flower
  const { id, name, desc, image, price } = flower;
  return (
    <div className="col-md-4">
      <div className="card cardSize">
          <img src={image} className="card-img-top card-img" alt={name} />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{desc}</p>
              <p className="card-text">${price}</p>
              <a href="#" className="btn btn-primary">Add to cart</a>
            </div>
            <div className="d-grid card-footer bg-secondary-subtle gap-3">
              <IconContext.Provider value={{ size: '2em'}}>
                <Link to={`/edit/${id}`}>
                  <button type='button' className='btn btn-warning p-3 text-primary fw-bold'>
                    <FaPencilAlt /> Edit
                  </button>
                </Link>
                <button type='button' className='btn btn-info text-danger p-3 fw-bold' onClick={e => onDelete(id, e) }>
                  <FaTimes /> Delete
                </button>
              </IconContext.Provider>
            </div>
        </div>
    </div>
  )
}

export default SingleProduct;
