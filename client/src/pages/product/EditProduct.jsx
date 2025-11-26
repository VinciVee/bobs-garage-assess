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
import adminService from '../../services/adminService';


const EditProduct = () => {
  const defaultImage = './public/Service_Placeholder.png'
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
  const { id } = useParams();
  const paramId = Number(id);
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


  // onChange event handler
  const handleChange = (e) => {
    const {name, type, value, checked, files} = e.target
    setFormData((prev) => ({
      ...prev,
      // Checking value type before setting formData
      [name]: type === "checkbox" ? checked :
      type === "file" ? files[0] : value
    }))
  }

  // onSubmit event handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Client-side validation - Check for errors
    // TBD

    console.log('Updating Service ', paramId)

    // DISPATCH USER
    try {
      const fileData = new FormData()
      let url = defaultImage
      // Uploading image if present
      if(image !== "") {
        fileData.append('file', image)
        const res = await adminService.uploadImage((fileData))
        if(res?.path) url = res.path
      }
      console.log(`default: ${defaultImage}, image: ${image}, url: ${url}`)
      // Send updated product
      dispatch(updateProduct({
        id: paramId,
        data: {
          name,
          desc,
          image: url,
          price }})).unwrap()
    } catch (error) {
      console.log('Failed to update service', error)
    } finally {
      setTimeout(() => {setLoading(false)}, 1000)
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
