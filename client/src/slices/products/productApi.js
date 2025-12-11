import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
  }),
  tagTypes: ['Products'],
  endpoints: (build) => ({

    // GET ALL PRODUCTS
    getAllProducts: build.query({
      query: () => ({
        url: '/products/',
        method: 'GET'
      })
    }),

    // ADD PRODUCT
    addProduct: build.mutation({
      query: (productData) => ({
        url: '/products/',
        method: 'POST',
        data: productData,
      }),
      invalidatesTags: ['Products'] // re-fetches getAllProducts
    }),

    // EDIT PRODUCT
    editProduct: build.query({
      query: (prodId, ...productData) => ({
        url: `/products/${prodId}`,
        method: 'PUT',
        data: productData,
      }),
      invalidatesTags: ['Products']
    }),

    // DELETE PRODUCT
    deleteProduct: build.query({
      query: (prodId) => ({
        url: `/products/${prodId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products']
    })
  })
})

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation
} = productsApi
