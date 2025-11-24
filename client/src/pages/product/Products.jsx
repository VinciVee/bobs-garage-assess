// Products.jsx

import ProductsList from '../../components/features/products/ProductsList';
import { useSelector } from 'react-redux';
import { selectAllProducts, getProductError, getProductStatus } from '../../slices/products/productSlice'

const Products = () => {
  // Set Selectors
  const productsList = useSelector(selectAllProducts)
  const status = useSelector(getProductStatus)
  const error = useSelector(getProductError)
  console.log('Products.jsx - loading products:\n', productsList )

  let content;

  switch (status) {
    case 'loading':
      console.log('Loading services...')
      content = ( <p>Loading...</p> )
      break

    case 'failed':
      console.log('Error: failed to load services...')
      content = (
        <div className='text-danger'>
          <p>{error}</p>
        </div>
      )
      break

    case 'succeeded':
      content = (
        <div>
          <ProductsList
            productsList={productsList}
          />
        </div>
      )
      break

    default:
      console.log('Default case for productsList status - Products.jsx')
  }

  return (
    <>
      <h2>Bob's Services</h2>
      <div className="row">
        { content }
      </div>
    </>
  )
}

export default Products;
