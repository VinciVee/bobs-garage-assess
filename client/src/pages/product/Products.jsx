/**
 * Products.jsx
 *
 *
 */
import SingleProduct from './SingleProduct';
import { useSelector } from 'react-redux';
import { selectAllProducts, getProductError, getProductMessage, getProductStatus } from '../../slices/productSlice'

const Products = () => {
  const productList = useSelector(selectAllProducts)
  const productStatus = useSelector(getProductStatus)
  const error = useSelector(getProductError)
  const message = useSelector(getProductMessage)
  console.log('Products.jsx\n', productList )

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
          <p>{message}</p>
        </div>
      )

    case 'succeeded':
      return (
        <>
          <div>
            <h2>Bob's Garage</h2>
            <div className="row">
              {productList.map((flower) =>
                  <SingleProduct
                      key={flower.prodId}
                      flower={flower}
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
