// // Import createContext and useContext from react.
// import { createContext, useContext } from "react";

// // Create the contexts to hold the state and functions
// export const ServicesContext = createContext() // Hold State
// export const ServicesUpdateContext = createContext() // Updating
// export const ServicesAddContext = createContext()  // Adding
// export const ServicesDeleteContext = createContext() // Deleting
// export const ServicesGetOneContext = createContext() // Getting one product
// export const ServicesGetAllContext = createContext() // Get all products

// // Create the custom hooks to allow use of the contexts we have created.
// // This will allow components to access the productList and even function.
// // These will be used with the child component
// export const useProduct = () => useContext(ServicesContext)
// export const useProductUpdate = () => useContext(ServicesUpdateContext)
// export const useProductAdd = () => useContext(ServicesAddContext)
// export const useProductDelete = () => useContext(ServicesDeleteContext)
// export const useGetOne = () => useContext(ServicesGetOneContext)
// export const useGetAll = () => useContext(ServicesGetAllContext)
