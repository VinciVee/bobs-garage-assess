import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'

// REGISTER POST REQUEST
export const register = createAsyncThunk(
  'auth/register',
  async(newUser, thunkAPI) => {
    console.log('[authSlice] Registering new user...')

    try {
      const response = await authService.register(newUser)
      console.log('response:\n', response.data)

      if(response.data){
        if(response.status === 400){
          throw Error({ message: response.data })
        }

        localStorage.setItem('token', response.data.token)
        // Get logged-in user's details
        const res = await authService.loadUser()
        return res.data
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)


// LOGIN POST REQUEST
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    console.log('[authSlice] Logging in...')
    try {
      const response = await authService.login({ email, password })
      const userInfo = response.data

      if(userInfo){
        if(response.status === 400){
          throw Error({ message: userInfo })
        }
        localStorage.setItem('token', userInfo.token)
        // setAuthToken(localStorage.token)
        // Get logged-in user's details
        const res = await authService.loadUser()
        return res.data
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// LOAD USER GET REQUEST
export const loadUser = createAsyncThunk(
  'auth/loadUser', async (_, thunkAPI) => {
    try {
      const response = await authService.loadUser()
      const userInfo = response.data
      console.log('loadUser (authSlice) response: ', userInfo)

      localStorage.setItem('theme', userInfo.themePreference)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const authThunks = {
  register,
  login,
  loadUser
}

export default authThunks
