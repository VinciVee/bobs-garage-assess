/**
 * Store.js
 * Creates a store to hold the states
 *
 */
import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../slices/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
  devTools: true,
})

