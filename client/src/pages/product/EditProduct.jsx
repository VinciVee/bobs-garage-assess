/**
 * EditProduct.jsx
 *
 *
 */
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductStatus, selectProductById } from '../../slices/products/productSlice'
import { updateProduct } from '../../slices/products/productThunks';

const EditProduct = () => {
  // Hooks
  let productId = Number(useParams()) // Get id from URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const product = useSelector((state) => selectProductById(state, productId))
  const status = useSelector(getProductStatus)

  // States
  const [ formData, setFormData] = useState({
    // Original product details
    id: product.id,
    name: product.name,
    desc: product.desc,
    image: product.image,
    price: product.price
  })
  const { id, name, desc, image, price} = formData;

  if(!product){
    return (
      <section className='text-danger'>
        <h2>Product not found!</h2>
      </section>
    )
  }

  console.log(`EditProject.jsx id: ${id}`)
  //  On Change
  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      // for this to work, name of attribute (in Form) needs to be the same as name of variable in user.
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault() // disable default submit button behaviour

    // Client-side validation - Check for errors

    // Object for updated flower
    const updFlower = {
      id,
      name,
      desc,
      image,
      price
    }
    console.log('UPDFLOWER: ', updFlower)

    try {
      dispatch(updateProduct({ id: id, data: updFlower})).unwrap()
    } catch (err) {
      console.log('Failed to update product', err)
    }
    // redirect to the products page
    navigate('/products')
  }

  // Create a form to add in new products
  // name, desc, image, price
  return (
   <>
    <h1 className="text-primary">Edit Product</h1>
    <div className="card mb-3">
      <div className="card-header bg-body-secondary">
        Edit the flower below:
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name">Flower name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              placeholder="The new flower name"
              value={name}
              onChange={handleTextChange}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="desc">Flower description:</label>
            <input
              className="form-control"
              type="text"
              id="desc"
              name="desc"
              placeholder="The flower description"
              value={desc}
              onChange={handleTextChange}
            />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label htmlFor="image">Flower image URL:</label>
            <input
              className="form-control"
              type="text"
              id="image"
              name="image"
              placeholder="https://myflower.net.url"
              value={image}
              onChange={handleTextChange}
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label htmlFor="price">Flower price:</label>
            <input
              className="form-control"
              type="text"
              id="price"
              name="price"
              placeholder="0.00"
              value={price}
              onChange={handleTextChange}
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid gap2-2">
            <input type="submit" value="Update Flower" className="btn btn-info text-white" />
          </div>
        </form>
      </div>
    </div>
   </>
  )
}

export default EditProduct;
