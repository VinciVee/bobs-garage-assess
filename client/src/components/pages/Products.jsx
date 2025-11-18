import SingleProduct from './SingleProduct';
// import the useProduct hook from our context
import { useProduct } from '../../context/DaisyContext';

const Products = () => {

  // Make use of our useProduct hook
  const productList = useProduct();

  return (
    <>
      <h2> Daisy's Flowers</h2>
      <div className="row">
        {
          productList.map( flower => (
            <SingleProduct
              key={flower.id}
              flower={flower}
            />
          ))
        }
      </div>
    </>
  )
}

export default Products;
