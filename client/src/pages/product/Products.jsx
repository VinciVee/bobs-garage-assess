// Products.jsx

import ProductsList from '../../components/features/products/ProductsList';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, getProductError, productSliceStatus, setStatus } from '../../slices/products/productSlice'
import { useEffect } from 'react';
import { fetchAllProducts } from '../../slices/products/productThunks';

const Products = () => {
  const dispatch = useDispatch()
  // Set Selectors
  const productsList = useSelector(selectAllProducts)
  const status = useSelector(productSliceStatus)
  const error = useSelector(getProductError)

  let content;

  const loadingContent = ( <p>Loading...</p> )

  const failedContent = ( <div className='text-danger'><p>{error}</p> </div> )

  const succeededContent = (<div><ProductsList productsList={productsList} /></div> )


  // If productsList are not showing
  useEffect(() => {
    if (productsList[0] != null && status === 'idle') {
      try {
        dispatch(fetchAllProducts())
      } catch (error) {
        console.log('Error while fetching all products: ', error.message)
      }
    }
  }, [status, dispatch, productsList])


  console.log('Products.jsx - loading products:\n', productsList )
  switch(status){
    case "loading":
      content = loadingContent;
      break;

    case "failed":
      content = failedContent;
      break;

    default:
      content = succeededContent;
  }

  return (
    <>
      <h2>Our's Services</h2>
      <div className="row">
        {content}
      </div>
    </>
  )
}

export default Products;
