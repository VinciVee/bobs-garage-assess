// Products.jsx

import ProductsList from '../../components/features/products/ProductsList';
import { useGetAllProductsQuery } from '../../services/productsApi'

const Products = () => {
  console.log('Hook:', useGetAllProductsQuery);

  const {
    data: products,
    isLoading,
    isError,
    error
  } = useGetAllProductsQuery()

  console.log('Products from query, ', products)

  const loadingContent = ( <p>Loading...</p> )

  const failedContent = ( <div className='text-danger'><p>{JSON.stringify(error?.data || error)}</p> </div> )

  const succeededContent = (<div><ProductsList productsList={products} /></div> )

  let content;
  if(isLoading) {
    content = loadingContent;
  } else if (isError) {
    content = failedContent;
  } else {
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
