import api from './api'

// GET ALL REQUEST
async function getAllProducts(){
  const response =  await api.get('/api/products')
  console.log('[productService] response:\n', response?.data)
  return response
}

// GET ONE PRODUCT Request
async function getProductById(id){
  const response =  await api.get(`/api/products/${id}`)
  console.log(response?.data)
  return response
}

// ADD PRODUCT Request
async function addProduct(data){
  const response =  await api.post('/api/products/add', data)
  console.log(response?.data)
  return response
}

// UPDATE PRODUCT Request
async function updateProduct(id, data){
  console.log(`Sending update request, id: ${id}`)
  const response =  await api.put(`/api/products/edit/${id}`, data)
  console.log(response?.data)
  return response
}

// DELETE PRODUCT Request
async function deleteProduct(id){
  const response =  await api.delete(`/api/products/delete/${id}`)
  console.log(response?.data)
  return response
}

const productService = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
}

export default productService
