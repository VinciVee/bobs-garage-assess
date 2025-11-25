/**
 * EditProduct.jsx
 *
 *
 */
// React Hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Redux modules
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById, getProductStatus } from '../../slices/products/productSlice'
import { updateProduct, fetchProduct } from '../../slices/products/productThunks';
// Local components
import BgCard from '../../components/common/BgCard'
import ProductForm from '../../components/features/forms/ProductForm';

const EditProduct = () => {
  // States
  const [loading, setLoading ] = useState(false)
  const [formData, setFormData] = useState({
    // Original product details
    name: '',
    desc: '',
    image: '',
    price: '',
    errors: {}
  })
  // Hooks
  const paramId = Number(useParams().id)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Find matching products
  const product = useSelector((state) => selectProductById(state, paramId))
  const status = useSelector(getProductStatus)
  // Wait for product
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        desc: product.desc,
        image: product.image,
        price: product.price,
        errors: {}
      })
    } else if (status === 'idle') {
      dispatch(fetchProduct(paramId))
    }
  }, [product, dispatch, paramId, status])

  const { name, desc, image, price} = formData;
  //  On Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Client-side validation - Check for errors

    // Object for updated service
    const updService = { name, desc, image, price }
    console.log('Updating Service: ', updService)

    try {
      dispatch(updateProduct({ id: paramId, data: updService})).unwrap()
    } catch (err) {
      console.log('Failed to update service', err)
    } finally {
      setTimeout(() => {setLoading(false), 1000})
      navigate('/products')
    }
  }

  // Create a form to add in new products
  // name, desc, image, price
  return (
   <>
    <h1 className="text-primary">Edit Service</h1>
    <div className="card mb-3">
      <BgCard title="Edit the Service's details">
        <ProductForm
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          loading={loading}
        />
      </BgCard>
    </div>
   </>
  )
}

export default EditProduct
