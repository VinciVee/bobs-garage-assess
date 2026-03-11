/**
 * EditProduct.jsx
 *
 *
 */
// React Hooks
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Redux modules
import { useGetProductQuery, useEditProductMutation } from '../../services/productsApi';
// Local components
import BgCard from '../../components/common/BgCard'
import ProductForm from '../../components/features/forms/ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const prodId = Number(id);
  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: '',
    price: 0,
    errors: {}
  })

  const {
    data: product,
    isLoading: isLoadingFetch,
    isError: isFetchError,
    error: fetchError
    // skip disables fetch if prodId is invalid
  } = useGetProductQuery(prodId, { skip: !prodId })

  // setFormData to product
  // useCallBack
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name ?? '',
        desc: product.desc ?? '',
        image: product.image ?? '',
        price: product.price ?? 0,
        errors: {}
      })
    }
  }, [product])

  const [ editProduct, {
    isLoading: isLoadingUpdate,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSuccess
  }] = useEditProductMutation()

  const {name, desc, image, price} = formData;


  // Sets form states before onClick event
  // event: user typing in form fields
  const handleTextChange = (e) => {
    const {name, type, value, checked} = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  // Handles change in image field
  // event: user uploads an image
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, image: file })
  }

  // onSubmit event handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsDisabled(true)
    console.log('Updating Service ', prodId )

    // Send updated product details as type FormData
    const productData = new FormData()
    productData.append('name', name)
    productData.append('desc', desc)
    productData.append('price', price)
    if (image instanceof File) {
      productData.append('image', image)
    }

    console.log('productData: ', productData)
    console.log('image: ', image)

    // SEND UPDATED PRODUCT
    try {
      await editProduct({
        prodId: prodId,
        productData: productData,
      }).unwrap()
      navigate('/products')

    } catch (err) {
      console.log('Failed to update service', err)
    } finally {
      console.log('reached finally, status')
      setTimeout(()=>{setIsDisabled(false)}, 3000)
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
          handleTextChange={handleTextChange}
          handleFileChange={handleFileChange}
          loading={isLoadingUpdate || isLoadingFetch}
          disabled={isDisabled}
        />
      </BgCard>
    </div>
   </>
  )
}

export default EditProduct
