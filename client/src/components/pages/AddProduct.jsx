// Use rafce to create our boilerplate
// import useState
import { useState } from "react";
// import uuid. create random ids for our application.
// Check https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';
// import useProductAdd from our context
import { useProductAdd } from "../../context/DaisyContext"
// import the validation functions.
import { alpha, is_empty, isValidPrice} from "../../util/validation"

const AddProduct = () => {
  // console.log(props);
  // Create the state to hold our form data and set the intial state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    desc: '',
    image: '',
    price: 0.00,
    errors: {},
  });

  const addProduct = useProductAdd()

  // We can destructure to pull the variables from the formData
  const { name, desc, image, price, errors} = formData;

  const onChange = e => {
    // e.target.name - inputbox we are typing in.
    // e.target.value - the text we have typed in the inputbox.
    // setFormData - this update the state
    // Use the spread operator '...' to get the current state first.
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    // By default a submit button will refreshes the page.
    // To stop this behaviour we can use the follow function.
    e.preventDefault();
    // This is helpful for client-side validation
    // Check to see that the function is called
    console.log('onSubmit (AddProducts) running...');

    // Check for errors
    // Client-side validation
    // Bootstrap has classes we can use for validation
    // https://getbootstrap.com/docs/5.3/forms/validation/

    // We can create functions to re_use for validation.

    // name errors
    if (is_empty(name)){
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
    // desc errors
    // image errors
    let defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYoR2rpqdWmu6bsR0BZb6y2Lw2TaglVVB8TQ&s'
    if(is_empty(image)){
      console.log('Use default image')
      setFormData({ ...formData, image: defaultImage })
    }else {
      defaultImage = image
      console.log(`image: ${defaultImage}`)
    }
    // Note you can create a regEx function to text the URL

    // price errors
    if(is_empty(price)){
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

    // Create a newProduct object
    // We can use ES6 JS Syntax
    // saying id: id, we can just use id.
    const newProduct = {
      id: uuidv4(),
      name,
      desc,
      image: defaultImage,
      price
    }

    // Now we would send this newProduct object to the ProductList or an API to add it in.
    // At the moment this component will not save our newProduct anywhere
    // We will look at fixing this in a little bit.
    console.log(newProduct);

    addProduct(newProduct);
    // We can do other things are we send off our newProduct
    // Redirect the front-en back to the homepage or the products page.
  };

  // Create a form to add in new products
  // name, desc, image, price
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
