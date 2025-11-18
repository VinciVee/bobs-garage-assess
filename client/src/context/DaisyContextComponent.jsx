// Import the useState hook from react to hold our state
import { useState } from "react";

// Import our contexts defined in DaisyContext.jsx
import { DaisyContext, DaisyUpdateContext, DaisyAddContext, DaisyDeleteContext, DaisyGetOneContext } from './DaisyContext'

// Create the provider to pass the state and functions to manipulate the state to the child components.
export const DaisyProvider = ({ children }) => {
  // Create the state with initial data
  const [ productList, setProductList ] = useState([
    {
      id: '1',
      name: "Rose",
      desc: "A single red rose",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxo2S2YxTJj5nfboJLRaBnG00kkTtYZL5aBA&s",
      price: 6.99
    },
    {
      id: '2',
      name: "Tulip",
      desc: "A bunch of purple tulips",
      image: "https://i2.pickpik.com/photos/208/372/903/tulips-tulip-fields-spring-flower-preview.jpg",
      price: 16.99
    },
    {
      id: '3',
      name: "Daisys",
      desc: "A bunch of daisies",
      image: "https://images.pexels.com/photos/10582883/pexels-photo-10582883.jpeg",
      price: 10.99
    },
    {
      id: '4',
      name: "Lillys",
      desc: "A bunch of lillies",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPGh1QVjvV0cfw_Gu7aPztBJsgVV2rq4BadQ&s",
      price: 9.99
    },
    {
      id: '5',
      name: "Orchids",
      desc: "A bunch of Orchids",
      image: "https://i1.pickpik.com/photos/85/107/632/orchid-mov-bouquet-preview.jpg",
      price: 19.99
    },
    {
      id: '6',
      name: "Fire blossom",
      desc: "A bunch of fire plants",
      image: "https://cdn12.picryl.com/photo/2016/12/31/flower-lillies-orange-liliies-e07430-1024.jpg",
      price: 15.99
    },
  ])

  // Set up the mutation functions
  // Setup the get product by id.
  const getProductById = id => {
    console.log(`Get Product by ID - DaisyContext.jsx`, id)

    // We need to find the product in our productList
    // Use the .find array method
    const item = productList.find((listItem) => listItem.id === id)
    console.log('Get product by id: ', item)
    return item
  }

  // Add new Product
  const addProduct = newProduct => {
    console.log('Add product - DaisyContext', newProduct)

    // Add the new product into the productList
    const newList = [...productList, newProduct]
    setProductList(newList)
  }

  // Update Product
  const updateProduct = (id, updProduct) => {
    console.log('Update product with id: ', id)
    // Array.map to map throuh the productList
    // user ternary operators to change the entry with matching ids.
    const newList = productList.map( item => item.id === id ? {
      id: id,
      name: updProduct.name,
      desc: updProduct.desc,
      image: updProduct.image,
      price: updProduct.price
    } : item);

    // Update the state
    setProductList(newList);
  }

  // Delete Product
  const deleteProduct = id => {
    console.log('Delete Product by ID - DaisyContext ', id)
    // use Array.filter method
    // Return a new array with the id selected removed.
    const newList = productList.filter(item => item.id !== id);
    // We can now use this new array to update the productList
    setProductList(newList);
  }

  // Create the return function
  // This will wrap all children in the provider and allow the children to access the productList and the functions we just created.
  return (
    <DaisyContext.Provider value={productList}>
      <DaisyGetOneContext.Provider value={getProductById}>
        <DaisyAddContext.Provider value={addProduct}>
          <DaisyUpdateContext.Provider value={updateProduct}>
            <DaisyDeleteContext.Provider value={deleteProduct}>
              { children }
            </DaisyDeleteContext.Provider>
          </DaisyUpdateContext.Provider>
        </DaisyAddContext.Provider>
      </DaisyGetOneContext.Provider>
    </DaisyContext.Provider>
  )
}
