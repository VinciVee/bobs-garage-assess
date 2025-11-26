/**
 * AddProduct.jsx
 *
 */
// React hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// Redux modules
import { addProduct } from "../../slices/products/productThunks";
// Local modules, components
import { alpha, is_Empty, isValidPrice} from "../../util/validation"
import BgCard from "../../components/common/BgCard";
import ProductForm from "../../components/features/forms/ProductForm";
import adminService from "../../services/adminService";

const AddProduct = () => {
  const defaultImage = './public/Service_Placeholder.png'
  // Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading ] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: defaultImage,
    price: '',
    errors: {},
  });

  const { name, desc, image, price, errors} = formData
  let imageFile = null;

  // onChange event handler
  const handleChange = e => {
    const { name, type, value, checked, files } = e.target
    setFormData((prev) => ({
      ...prev,
      // Checking value type before setting formData
      [name]: type === "checkbox" ? checked :
      type === "file" ? files[0] : value
    }))
  }

  // onSubmit event handler
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log('onSubmit (AddProducts) running...');

    // CLIENT-SIDE VALIDATION --------
    // https://getbootstrap.com/docs/5.3/forms/validation/
    // NAME
    // If empty
    if (is_Empty(name)){
      console.log('Name empty')
      setFormData({
        ...formData,
        error: {
          name: 'You must enter the flower name in the box above'
        }
      })
      return
    } else {
      setFormData({...formData, errors: {name: ''}})
    }
    // if alphanumeric
    if(alpha(name)){
      console.log('Name special characters')
      setFormData({
        ...formData,
        errors: {
          name: 'You can not include any special characters. Alpha characters only'
        }
      })
      return
    }else {
      setFormData({...formData, errors: {name: ''}})
    }

    // DESCRIPTION
    // TBD

    // IMAGE
    // if empty
    if(is_Empty(imageFile)){
      console.log('Use default image')
      setFormData({ ...formData, image: defaultImage })
    }

    // PRICE
    // if empty
    if(is_Empty(price)){
      console.log('Price is empty')
      setFormData({
        ...formData,
        errors: {
          price: 'You must enter your price in the box above.'
        }
      })
      return
    } else {
      setFormData({...formData, errors: { price: ''}})
    }
    // if negative value
    if(price <= 0){
      console.log('Price negative or zero')
      setFormData({
        ...formData,
        errors: {
          price: 'Price must be greater then 0'
        }
      })
      return
    } else {
      setFormData({ ...formData, errors: {price: ''}})
    }
    // If valid
    if(!isValidPrice(price)){
      console.log('Price is not valid')
      setFormData({
        ...formData,
        errors: {
          price: 'Price must be numbers with 2 decimal places'
        }
      })
      return
    } else {
      console.log(price)
      setFormData({...formData, errors: { price: ''}})
    }
    // CLIENT-SIDE VALIDATION END --------

    try {
      // Getting image URL
      const fileData = new FormData()
      fileData.append('file', imageFile)
      const res = adminService.uploadImage((fileData))
      const url = res? res.path : defaultImage
      setFormData({...formData, image: url})

      // Send new product
      dispatch(addProduct({
        name,
        desc,
        image,
        price })).unwrap()
    } catch (error) {
      console.log('Failed to add service', error)
    } finally {
      setTimeout(() => {setLoading(false), 1000})
      navigate('/products')
    }
  };

  return (
   <>
    <h1 className="text-primary">Add a New Service</h1>
    <div className="card mb-3">
      <BgCard title="Add the new Service's details">
        <ProductForm
          formData={formData}
          imageFile={imageFile}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          loading={loading}
        />
      </BgCard>
    </div>
   </>
  )
}

export default AddProduct;
