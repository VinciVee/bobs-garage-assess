import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'

// console.log('axiosBaseQuery:', axiosBaseQuery);
// console.log('axiosBaseQuery():', axiosBaseQuery({ baseUrl: 'test' }))

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api/products',
  }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    // GET ALL PRODUCTS
    getAllProducts: build.query({
      query: () => ({
        url: '/',
        method: 'GET'
      }),
      providesTags: ['Products']
    }),

    // GET PRODUCT BY ID
    getProduct: build.query({
      query: (prodId) => ({
        url: `/${prodId}`,
        method: 'GET'
      }),
      providesTags: (result, error, prodId) => [
        { type: 'Product', id: prodId }
      ]
    }),

    // ADD PRODUCT
    addProduct: build.mutation({
      query: (productData) => ({
        url: '/',
        method: 'POST',
        data: productData,
      }),
      invalidatesTags: ['Products'] // re-fetches getAllProducts
    }),

    // EDIT PRODUCT
    editProduct: build.mutation({
      query: ({ prodId, productData }) => ({
        url: `/${prodId}`,
        method: 'PUT',
        data: productData,
      }),
      invalidatesTags: (result, error, {prodId}) => [
        { type: 'Product', id: prodId } ,
        'Products'
      ]
    }),

    // DELETE PRODUCT
    deleteProduct: build.mutation({
      query: (prodId) => ({
        url: `/${prodId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, prodId) => [
        { type: 'Product', id: prodId },
        'Products'
      ]
    })
  })
})

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation
} = productsApi
