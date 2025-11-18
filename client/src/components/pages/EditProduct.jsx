// We can cheat a little here and copy our code from AddProduct and modify it
// The EditProduct component will not be able to edit anything till we makes some changes.
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
// Import useProductUpdate, useGetOne
import { useProductUpdate, useGetOne } from '../../context/DaisyContext'

const EditProduct = () => {
  // log our props
  // console.log(props);

  // set up the state
  const [ formData, setFormData] = useState({
    id: '',
    name: '',
    desc: '',
    image: '',
    price: ''
  });

  // make use for the useParams hook
  // This will allow us to pull the id out of the url bar.
  const {id} = useParams();
  // log the id
  console.log(id);
  // Use the useNavigate hook
  const navigate = useNavigate();

  // set up the context hooks
  const getFlower = useGetOne()
  const updateFlower = useProductUpdate()

  useEffect(() => {
    const flower = getFlower(id);
    // Set the state with the new data
    console.log(flower)
    setFormData({
      id: flower.id,
      name: flower.name,
      desc: flower.desc,
      image: flower.image,
      price: flower.price
    })
  }, [id, getFlower]);

  // Destructure our state
  const { name, desc, image, price} = formData;
  //  On Change
  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  })

  const onSubmit = e => {
    // By default a submit button will refreshes the page.
    // To stop this behaviour we can use the follow function.
    e.preventDefault();
    // This is helpful for client-side validation
    // Check to see that the function is called
    console.log('onSubmit (EditProducts) running...');
    console.log(`${id} ${name} ${desc} ${image} ${price}`);

    // Check for errors

    // create our updated flower
    const updFlower = {
      id,
      name,
      desc,
      image,
      price
    }
    // Send the updFlower to an API or state management.
    console.log(updFlower);

    // Call the handle update function
    updateFlower(id, updFlower);

    // redirect to the home page
    navigate('/products');

  };

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
        <form onSubmit={e => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="name">Flower name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              placeholder="The new flower name"
              value={name}
              onChange={e => onChange(e)}
            />
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
            <input type="submit" value="Update Flower" className="btn btn-info text-white" />
          </div>
        </form>
      </div>
    </div>
   </>
  )
}

export default EditProduct;
