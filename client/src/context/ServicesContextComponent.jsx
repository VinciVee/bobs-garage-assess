// // Import the useState hook from react to hold our state
// import { useState } from "react";

// import productService from "../services/productService";
// // Import our contexts defined in ServicesContext.jsx
// import { ServicesContext, ServicesUpdateContext, ServicesAddContext, ServicesDeleteContext, ServicesGetOneContext, ServicesGetAllContext } from './ServicesContext'

// // PROVIDER
// export const ServicesProvider = ({ children }) => {
//   const [ productList, setProductList ] = useState([])

//   // MUTATION FUNCTIONS
//   // Get All Products
//   const getAllProducts = async () => {
//     console.log('Get All Products - ServicesContextComponent.jsx')
//     try {
//       const res = await productService.getAllProducts()
//       console.log(res.data)
//       setProductList(res.data)

//     } catch(err) {
//       console.log(err)
//     }
//   }

//   // Setup the get product by id.
//   const getProductById = async (id) => {
//     console.log(`Get Product by ID - ServicesContext.jsx`, id)
//     try {
//       const item = await productService.getProductById(id)

//       console.log('Get product by id: ', item)
//       return item

//     } catch(err) {
//       console.log(err)
//     }
//   }

//   // Add new Product
//   const addProduct = async (newProduct) => {
//     console.log('Add product - ServicesContext', newProduct)

//     try {
//       // const product = await axios.post('http://localhost:3001/api/products/add', newProduct)
//       const product = await productService.addProduct(newProduct)

//       // Update state
//       const newList = [...productList, product]
//       setProductList(newList)

//     } catch(err) {
//       console.log(err)
//     }
//   }

//   // Update Product
//   const updateProduct = async (id, updProduct) => {
//     console.log('Update product with id: ', id)

//     try {
//       // const result = axios.put(`http://localhost:3001/api/products/edit/${id}`, updProduct)
//       const result = await productService.updateProduct(id, updProduct)

//       if(result){
//         const newList = productList.map( item => item.id === id ? {
//           id: id,
//           name: updProduct.name,
//           desc: updProduct.desc,
//           image: updProduct.image,
//           price: updProduct.price
//         } : item
//       )
//         setProductList(newList);
//       }
//     } catch(err) {
//       console.log(err)
//     }
//   }

//   // Delete Product
//   const deleteProduct = (id) => {
//     console.log('Delete Product by ID - ServicesContext ', id)

//     try {
//       // Note: no response from database when deleting
//       // axios.delete(`http://localhost:3001/api/products/delete/${id}`)
//       productService.deleteProduct(id)

//       const newList = productList.filter(item => item.id !== id);
//       // We can now use this new array to update the productList
//       setProductList(newList);

//     } catch(err) {
//       console.log(err)
//     }
//   }

//   // Create the return function
//   // This will wrap all children in the provider and allow the children to access the productList and the functions we just created.
//   return (
//     <ServicesContext.Provider value={productList}>
//       <ServicesGetOneContext.Provider value={getProductById}>
//         <ServicesAddContext.Provider value={addProduct}>
//           <ServicesUpdateContext.Provider value={updateProduct}>
//             <ServicesDeleteContext.Provider value={deleteProduct}>
//               <ServicesGetAllContext.Provider value={getAllProducts}>
//                 { children }
//               </ServicesGetAllContext.Provider>
//             </ServicesDeleteContext.Provider>
//           </ServicesUpdateContext.Provider>
//         </ServicesAddContext.Provider>
//       </ServicesGetOneContext.Provider>
//     </ServicesContext.Provider>
//   )
// }
