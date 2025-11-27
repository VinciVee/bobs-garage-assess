// Holds state, actions and reducer for products
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProduct, addProduct, updateProduct, deleteProduct } from "./productThunks";
import { handlePending, handleRejected, payloadError, filterList, updateList } from "../../util/reduxHelpers";

// INITIAL STATE
const initialState = {
  productList: [],
  product: {},
  status: 'idle', // idle, loading, succeeded, failed
  error: null
}

// REDUCERS ---------
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
   },
  // possible outcomes: pending, fullfilled, rejected
  extraReducers: (builder) => {
    builder
    // FETCH ALL PRODUCTS
    .addCase(fetchAllProducts.pending, handlePending)
    .addCase(fetchAllProducts.rejected, handleRejected)
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      console.log('[productSlice] payload: ', action.payload)
      state.status = 'succeeded'
      state.error = null
      state.productList = action.payload
    })

    // FETCH PRODUCT BY ID
    .addCase(fetchProduct.pending, handlePending)
    .addCase(fetchProduct.rejected, handleRejected)
    .addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.product = action.payload
      state.error = null
    })

    // UPDATE PRODUCT
    .addCase(updateProduct.pending, handlePending)
    .addCase(updateProduct.rejected, handleRejected)
    .addCase(updateProduct.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "updated")
        console.log('[Slice] payload:',action.payload)

      state.status = 'succeeded'
      state.error = null
      state.product = action.payload
      state.productList = updateList(state.productList, action.payload)
    })

    // ADD PRODUCT
    .addCase(addProduct.pending, handlePending)
    .addCase(addProduct.rejected, handleRejected)
    .addCase(addProduct.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "added")

      state.status = 'succeeded'
      state.error = null
      state.product = action.payload
      state.productList.push(action.payload)
    })

    // DELETE PRODUCT
    .addCase(deleteProduct.pending, handlePending)
    .addCase(deleteProduct.rejected, handleRejected)
    .addCase(deleteProduct.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "deleted")

      state.status = 'succeeded'
      state.error = null
      state.productList = filterList(state.productList, action.meta.arg)
    })
  }
})

//EXPORT ACTIONS
export const { setStatus } = productSlice.actions;

// EXPORT SELECTORS
// note: state.'product'.... refers to 'product' in store.js
export const selectAllProducts = (state) => state.products.productList
export const productSliceStatus = (state) => state.products.status
export const getProductError = (state) => state.products.errors
export const selectProductById = (state, id) => state.products.productList.find(item => item.id === id)


export default productSlice.reducer
