/**
 * Products.jsx
 *
 *
 */
import SingleProduct from './SingleProduct';
import { useSelector } from 'react-redux';
import { selectAllProducts, getProductError, getProductStatus } from '../../slices/products/productSlice'

const Products = () => {
  // Set Selectors
  const productList = useSelector(selectAllProducts)
  const productStatus = useSelector(getProductStatus)
  const error = useSelector(getProductError)
  console.log('Products.jsx - loading products:\n', productList )

  switch (productStatus) {
    case 'loading':
      console.log('Loading the products...')
      return (
        <p>Loading...</p>
      )

    case 'failed':
      console.log('Error: failed at loading the products...')
      return (
        <div className='text-danger'>
          <p>{error}</p>
        </div>
      )

    case 'succeeded':
      return (
        <>
          <div>
            <h2>Bob's Garage</h2>
            <div className="row">
              {productList.map((service) =>
                  <SingleProduct
                      key={service.id}
                      product={service}
                  />
              )}
            </div>
          </div>
        </>
      )

    default:
      console.log('Default case for productList status - Products.jsx')
      return null

  }
}

export default Products;
