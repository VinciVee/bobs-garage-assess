import api from './api'

// UPLOAD IMAGE
async function uploadImage(formData) {
  const response = await api.post('/api/admin/uploadImage', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  console.log(response?.data)
  return response
}

// GET IMAGE URL
async function getImageURL(filename){
  const response = await api.get(`/api/admin/getImageURL/${filename}`)
  console.log(response?.data)
  return response
}

// GET IMAGE LIST
async function getImageList(){
  const response = await api.get('/api/admin/getImageList')
  console.log(response?.data)
  return response
}

const adminService = {
  uploadImage,
  getImageURL,
  getImageList
}

export default adminService
