import ProductItem from './ProductItem'
// Redux modules
import { useDispatch, useSelector } from 'react-redux'
import { getIsAdmin, getIsAuth } from '../../../slices/auth/authSlice'
import { deleteProduct } from '../../../slices/products/productThunks';
import { Navigate } from 'react-router-dom';
import * as styles from './ProductList.css'

function ProductsList({productsList}) {
  const dispatch = useDispatch()
  const isAdmin = useSelector(getIsAdmin)
  const isAuth = useSelector(getIsAuth)

  const handleDelete = (id, e) => {
    console.log('[ProductsList] handleDelete: ', e.type);
    try {
      dispatch( deleteProduct(id) ).unwrap()
      Navigate('/products')
    } catch (err) {
      console.log('Failed to delete product', err)
    }
  }

  return (
    <div className={styles.productGrid}>
      {productsList.map((service) =>
        <ProductItem
          key={service.id}
          product={service}
          isAdmin={isAdmin}
          isAuth={isAuth}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default ProductsList
