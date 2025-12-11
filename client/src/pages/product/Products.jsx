/* eslint-disable react-hooks/exhaustive-deps */
// Products.jsx

import ProductsList from '../../components/features/products/ProductsList';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, getProductError, productSliceStatus, setStatus } from '../../slices/products/productSlice'
import { useEffect, useRef } from 'react';
import { fetchAllProducts } from '../../slices/products/productThunks';

const Products = () => {
  const dispatch = useDispatch()
  // Set Selectors
  const productsList = useSelector(selectAllProducts)
  const status = useSelector(productSliceStatus)
  const error = useSelector(getProductError)
  // dispatch(setStatus('idle'))

  const loadingContent = ( <p>Loading...</p> )

  const failedContent = ( <div className='text-danger'><p>{error}</p> </div> )

  const succeededContent = (<div><ProductsList productsList={productsList} /></div> )

  const effectRan = useRef(false)
  useEffect(() => {
    if (effectRan.current === false) {
      getProduct()
      // dispatch(setStatus('succeeded'))
      return ()=>{
        effectRan.current = true
      }
    }
  }, [])

  async function getProduct() {
    try {
      dispatch(fetchAllProducts())
    } catch (error) {
      console.log('Error while fetching all products: ', error.message)
    }
  }

  let content;

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
      <h2>Our Services</h2>
      <div className="row">
        {content}
      </div>
    </>
  )
}

export default Products;
