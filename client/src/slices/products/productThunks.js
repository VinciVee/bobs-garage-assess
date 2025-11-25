import { createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../../services/productService'

// GET ALL PRODUCTS
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, thunkAPI) => {
    console.log('[productThunks] Fetching products...')
    try {
      const response = await productService.getAllProducts()
      console.log('...response:\n', response.data)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// GET PRODUCT BY ID
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
    async (id, thunkAPI) => {
    console.log('Fetching product by id: ', id)
    try {
      const response = await productService.getProductById(id)

      console.log('response:\n', response.data)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// ADD PRODUCT
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async(newProduct, thunkAPI) => {
    try {
      console.log('Adding a new product....')
      const response = await productService.addProduct(newProduct)

      console.log('response:\n', response.data)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async({ id, data }, thunkAPI) => {
    console.log('[Thunk] Updating product: ', id)
    try {
      const response = await productService.updateProduct(id, data)
      console.log('response:\n', response.data)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async(id, thunkAPI) => {
    console.log('Delete Product by id: ', id)
    try {
      const response = await productService.deleteProduct(id)
      if (response.status === 204) return id
      return `${response.status}: ${response.statusText}`

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
