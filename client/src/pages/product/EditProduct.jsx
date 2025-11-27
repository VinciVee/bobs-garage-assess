/**
 * EditProduct.jsx
 *
 *
 */
// React Hooks
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Redux modules
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById, productSliceStatus, getProductError, setStatus } from '../../slices/products/productSlice'
import { updateProduct, fetchProduct } from '../../slices/products/productThunks';
// Local components
import BgCard from '../../components/common/BgCard'
import ProductForm from '../../components/features/forms/ProductForm';
import adminService from '../../services/adminService';


const EditProduct = () => {
  const { id } = useParams();
  const productId = Number(id);
  // Set Selectors
  const product = useSelector((state) => selectProductById(state, productId))
  const status = useSelector(productSliceStatus)
  const error = useSelector(getProductError)
  // Hooks to use later
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Other Status
  const [updatedStatus, setUpdatedStatus] = useState("idle")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: '',
    price: '',
    errors: {}
  })
  useEffect(() => {
    if(updatedStatus==="idle" || !loading) {
      if (product != null) {
        console.log('setting form data')
        setFormData({
          name: product.name,
          desc: product.desc,
          image: product.image,
          price: product.price,
          errors: {}
        })
      } else if (status === 'idle') {
        dispatch(fetchProduct(productId))
      }
    }
  }, [product, dispatch, productId, status, updatedStatus, loading])

  const {name, desc, image, price} = formData;
  const defaultImage = '/assets/Service_Placeholder.png'


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
    setUpdatedStatus("loading")
    setLoading(true)
    // Client-side validation - Check for errors
    // TBD

    console.log('Updating Service ', productId )

    // DISPATCH USER
    try {
      const fileData = new FormData()
      let url = defaultImage
      // Uploading image if present
      if(image !== "") {
        fileData.append('file', image)
        const res = await adminService.uploadImage(fileData)
        console.log('res before url:', JSON.stringify(res))
        if(res.path != null) {url = res.path}
      }
      console.log(`default: ${defaultImage}, image: ${image}, url: ${url}`)

      // Send updated product
      dispatch(updateProduct({
        id: productId,
        data: {
          name,
          desc,
          image: url,
          price }})).unwrap()
    } catch (error) {
      console.log('Failed to update service', error)
    } finally {
      console.log('reached finally, status')
      dispatch(setStatus("idle"))
      setUpdatedStatus("succeeded")
      setTimeout(()=>{setLoading(false)}, 3000)
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
