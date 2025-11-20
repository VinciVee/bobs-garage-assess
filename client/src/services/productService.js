import api from './api'

// GET ALL REQUEST
function getAllProducts(){
  return api.get('/api/products')
}

// GET ONE PRODUCT Request
function getProductById(id){
  return api.get(`/api/products/${id}`)
}

// ADD PRODUCT Request
function addProduct(data){
  return api.post('/api/products/add', data)
}

// UPDATE PRODUCT Request
function updateProduct(id, data){
  console.log(`Sending update request, id: ${id}`)
  return api.put(`/api/products/edit/${id}`, data)
}

// DELETE PRODUCT Request
function deleteProduct(id){
  return api.delete(`/api/products/delete/${id}`)
}

const productService = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
}

export default productService
