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
      console.log('Loading...')
      return (
        <p>Loading...</p>
      )

    case 'failed':
      console.log('Errors...')
      return (
        <div className='text-danger'>
          <p>{error}</p>
          <p>{message}</p>
        </div>
      )

    default:
      return (
        <>
          <div>
            <h2>Bob's Garage</h2>
            <div className="row">
              {
                productList.map( flower => (
                  <SingleProduct
                    key={flower.prodId}
                    flower={flower}
                  />
                ))
              }
            </div>
          </div>
        </>
      )
  }
}

export default Products;
