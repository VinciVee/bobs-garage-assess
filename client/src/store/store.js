/**
 * Store.js
 * Creates a store to hold the states
 *
 */
import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../slices/products/productSlice'
import authReducer from '../slices/auth/authSlice'
import userReducer from '../slices/users/userSlice'
import adminReducer from '../slices/admin/adminSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    users: userReducer,
    admin: adminReducer,
  },
  devTools: true,
})

