import api from './api'

// GET ALL USERS REQUEST
function getAllUsers(){
  return api.get('/api/users')
}

// GET ONE USER Request
function getUserById(id){
  return api.get(`/api/users/${id}`)
}

// ADD USER Request
function addUser(data){
  return api.post('/api/users/add', data)
}

// UPDATE USER Request
function updateUser(id, data){
  console.log(`Sending update request, id: ${id}`)
  return api.put(`/api/users/edit/${id}`, data)
}

// DELETE USER Request
function deleteUser(id){
  return api.delete(`/api/users/delete/${id}`)
}

const userService = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
}

export default userService
