/**
 * AddProduct.jsx
 *
 *
 */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../slices/products/productThunks";
import { alpha, is_Empty, isValidPrice} from "../../util/validation"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: '',
    price: 0.00,
    errors: {},
  });

  const dispatch = useDispatch()

  const { name, desc, image, price, errors} = formData

  const onChange = e => {
    // e.target.name - inputbox we are typing in.
    // e.target.value - the text we have typed in the inputbox.
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    // Prevent submit button default behavior - refreshes the page
    e.preventDefault()
    console.log('onSubmit (AddProducts) running...');

    // CLIENT-SIDE VALIDATION --------
    // https://getbootstrap.com/docs/5.3/forms/validation/
    // NAME
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

    // IMAGE
    let defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYoR2rpqdWmu6bsR0BZb6y2Lw2TaglVVB8TQ&s'
    if(is_Empty(image)){
      console.log('Use default image')
      setFormData({ ...formData, image: defaultImage })
    }else {
      defaultImage = image
      console.log(`image: ${defaultImage}`)
    }

    // PRICE
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

    // Create product object
    const newProduct = {
      name,
      desc,
      image: defaultImage,
      price
    }
    console.log(newProduct);
    dispatch( addProduct(newProduct))
    // Can redirect to home page here...
  };

  return (
   <>
    <h1 className="text-primary">Add New Product</h1>
    <div className="card mb-3">
      <div className="card-header bg-body-secondary">
        Add the new flower below:
      </div>
      <div className="card-body">
        <form onSubmit={e => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="name">Flower name:</label>
            <input
              className={`form-control ${errors.name ? "is-invalid" : "is-valid"}`}
              type="text"
              id="name"
              name="name"
              placeholder="The new flower name"
              value={name}
              onChange={e => onChange(e)}
            />
            { errors.name && <div className="invalid-feedback fs-3">
                {errors.name}
              </div>
            }
          </div>
          <div className="mb-3">
            <label htmlFor="desc">Flower description:</label>
            <input
              className="form-control"
              type="text"
              id="desc"
              name="desc"
              placeholder="The flower description"
              value={desc}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image">Flower image URL:</label>
            <input
              className="form-control"
              type="text"
              id="image"
              name="image"
              placeholder="https://myflower.net.url"
              value={image}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price">Flower price:</label>
            <input
              className="form-control"
              type="text"
              id="price"
              name="price"
              placeholder="0.00"
              value={price}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="d-grid gap2-2">
            <input type="submit" value="Add Flower" className="btn btn-info text-white" />
          </div>
        </form>
      </div>
    </div>
   </>
  )
}

export default AddProduct;
