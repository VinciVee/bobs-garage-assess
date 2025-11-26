import api from './api'

// UPLOAD IMAGE
async function uploadImage(fileData) {
  const response = await api.post('/api/admin/uploadImage', fileData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  console.log('adminService, response: ', response?.data)
  return response
}

// GET IMAGE URL
async function getImageURL(filename){
  const response = await api.get(`/api/admin/getImageURL/${filename}`)
  console.log('adminService, response: ', response?.data)
  return response
}

// GET IMAGE LIST
async function getImageList(){
  const response = await api.get('/api/admin/getImageList')
  console.log('adminService, response: ', response?.data)
  return response
}

const adminService = {
  uploadImage,
  getImageURL,
  getImageList
}

export default adminService
