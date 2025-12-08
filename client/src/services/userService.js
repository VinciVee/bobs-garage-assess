import api from './api'

// GET ALL USERS REQUEST
async function getAllUsers(){
  const response = await api.get('/api/users')
  console.log('userService, response: ', response?.data)
  return response
}

// GET ONE USER Request
// async function getUserById(id){
//   const response = api.get(`/api/users/${id}`)
//   console.log('userService, response: ', response?.data)
//   return response
// }

// ADD USER Request
async function addUser(newUser){
  console.log('Sending request for new user:', JSON.stringify(newUser))
  const response = await api.post('/api/users/', newUser)
  console.log('userService, response: ', response)
  return response
}

// UPDATE USER Request
async function updateUser(id, data){
  console.log('[userService] data: ', JSON.stringify(data))
  const response = await api.put(`/api/users/${id}`, data)
  console.log('userService, response: ', response?.data)
  return response.data
}

// DELETE USER Request
async function deleteUser(id){
  const response = await api.delete(`/api/users/${id}`)
  console.log('userService, response: ', response?.data)
  return response
}

// UPDATE USER PROFILE
async function updateProfile(){
  const response = await api.put(`/api/profile`)
  console.log('Updated user: ', response?.data)
  return response
}

const userService = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  updateProfile,
}

export default userService
