/**
 * productSlice.js
 * Holds state, actions and reducer for products
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../services/productService";
import EditProduct from "../pages/product/EditProduct";

// INITIAL STATE
const initialState = {
  productList: [],
  product: {},
  status: 'idle', // idle, loading, succeeded, failed
  errors: null,
  message: null
}

// ACTIONS
// Get all products
export const fetchAllProducts = createAsyncThunk('product/FetchAllProducts', async () => {
  console.log('Fetching products...')
  try {
    const response = await productService.getAllProducts()
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err.message)
    return err.message
  }
})

// Get a product by id
export const fetchProduct = createAsyncThunk('product/FetchProduct', async (id) => {
  console.log('Fetching product by id: ', id)
  try {
    const response = await productService.getProductById(id)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err.message)
    return err.message
  }
})

// Add a product
export const addProduct = createAsyncThunk('product/AddNewProduct', async(newProduct) => {
  try {
    const response = await productService.addProduct(newProduct)
    console.log(response.data)
    return response.data

  } catch(err) {
    console.log(err.message)
    return err.message
  }
})

// Update a product
export const updateProduct = createAsyncThunk('product/UpdateProduct', async({ id, data }) => {
  console.log('Updating product with id: ', id)
  console.log('PRODUCT:', data)
  try {
    const response = await productService.updateProduct(id, data)
    console.log(response.data)
    return response.data

  } catch(err) {
    console.log(err.message)
    return err.message
  }
})

// Delete a product
export const deleteProduct = createAsyncThunk('product/DeleteProduct', async(id) => {
  console.log('Delete Product by id: ', id)
  try {
    const response = await productService.deleteProduct(id)
    if (response.status === 204) return id
    return `${response.status}: ${response.statusText}`
  } catch(err) {
    console.log(err.message)
    return err.message
  }
})

// REDUCER
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  // possible outcomes: pending, fullfilled, rejected
  extraReducers: (builder) => {
    builder
      // FETCH ALL PRODUCTS
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = 'loading'
        state.message = 'loading'
        state.currentRequestID = action.meta.requestId
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = null
        // inside slices, immer.js is used under the hood to create a copy of the array and merge with current list
        // i.e: [...productList, action.payload]
        state.productList = action.payload
        state.currentRequestID = null
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.error.message
        state.errors = action.error.message
      })

      // FETCH PRODUCT
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'loading'
        state.message = 'loading'
        state.currentRequestID = action.meta.requestId
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = null
        state.productList = action.payload
        state.currentRequestID = null
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.error.message
        state.errors = action.error.message
      })

      // UPDATE PRODUCT
      .addCase(updateProduct.pending, (state, action) => {
        state.status = 'loading'
        state.message = 'loading'
        state.currentRequestID = action.meta.requestId
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = null
        state.errors = null
        state.product = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.error.message
        state.errors = action.error.message
      })

      // ADD PRODUCT
      .addCase(addProduct.pending, (state, action) => {
        state.status = 'loading'
        state.message = 'loading'
        state.currentRequestID = action.meta.requestId
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        if(!action.payload){
          console.log('Product could not be added')
          state.message = 'Product could not be added'
          return
        }
        state.status = 'succeeded'
        state.message = null
        state.errors = null
        state.product = action.payload
        state.productList.push(action.payload)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.error.message
        state.errors = action.error.message
      })

      // DELETE PRODUCT
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = 'loading'
        state.message = 'loading'
        state.errors = null
        state.currentRequestID = action.meta.requestId
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if(!action.payload){
          console.log('Product could not be removed')
          state.message = 'Product could not be removed'
          return
        }
        state.status = 'succeeded'
        state.message = null
        state.errors = null
        const prodId = action.payload
        const list = state.productList.filter(item => item.prodId !== prodId)
        state.productList = list
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.error.message
        state.errors = action.error.message
      })
  }
})

// SELECTORS
// note: state.'product'.... refers to 'product' in store.js
export const selectAllProducts = state => state.product.productList
export const getProductStatus = state => state.product.status
export const getProductError = state => state.product.errors
export const selectById = ( state, prodId ) => state.product.productList.find( item => item.prodId === prodId )
export const getProductMessage = state => state.product.message

export default productSlice.reducer
