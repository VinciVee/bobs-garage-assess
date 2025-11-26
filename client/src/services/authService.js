import api from './api'

// REGISTER POST REQUEST
async function register(data){
  const response = await api.post('/api/auth/register', data)
  console.log('[authService] Response:', response?.data)
  return response
}

// LOGIN POST REQUEST
async function login({ email, password }){
  const response = await api.post('/api/auth/login', {email, password})
  console.log('[authService] Response:', response?.data)
  return response
}

// LOADUSER GET REQUEST
async function loadUser() {
  const response = await api.get('/api/auth')
  console.log('[authService] Response:', response?.data)
  return response
}

const authService = {
  register,
  login,
  loadUser
}

export default authService
