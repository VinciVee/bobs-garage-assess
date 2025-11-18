// Import createContext and useContext from react.
import { createContext, useContext } from "react";

// Create the contexts to hold the state and functions
export const DaisyContext = createContext() // hold state
export const DaisyUpdateContext = createContext() // updating
export const DaisyAddContext = createContext()  // adding
export const DaisyDeleteContext = createContext() // deleting
export const DaisyGetOneContext = createContext() // getting one product

// Create the custom hooks to allow use of the contexts we have created.
// This will allow components to access the productList and even function.
// These will be used with the child component
export const useProduct = () => useContext(DaisyContext)
export const useProductUpdate = () => useContext(DaisyUpdateContext)
export const useProductAdd = () => useContext(DaisyAddContext)
export const useProductDelete = () => useContext(DaisyDeleteContext)
export const useGetOne = () => useContext(DaisyGetOneContext)
