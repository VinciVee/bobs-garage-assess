/**
 * authSlice.js
 * Holds state, actions and reducer for products
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../services/authService";
// import axios from "axios";
import setAuthToken from "../util/setAuthToken";

// INITIAL STATE
const initialState = {
  user: {},
  token: '',
  isAuth: false,
  isAdmin: false,
  status: 'idle', // idle, loading, succeeded, failed
  errors: null
}

// ACTIONS
// LOGIN
export const login = createAsyncThunk('auth/Login', async ({ email, password }) => {
  console.log('Logging in...')
  try {
    const response = await authService.login({ email, password })
    console.log(response.data.token)

    if(response.data){
      if(response.status === 400){
        throw Error({ message: response.data })
      }

      localStorage.setItem('token', response.data.token)
      setAuthToken(localStorage.token)
      // Get logged-in user's details
      // const res = await axios.get(`${baseURL}`)
      // return res.data
      return response.data
    }
  } catch (err) {
    console.log('Error logging in, ', err.message)
    return err.message
  }
})

// REGISTER
export const register = createAsyncThunk('auth/Register', async(newUser) => {
  console.log('Registering new user...')
  try {
    const response = await authService.register(newUser)
    console.log(response.data)

    if(response.data){
      if(response.status === 400){
        throw Error({ message: response.data })
      }

      localStorage.setItem('token', response.data.token)
      setAuthToken(localStorage.token)
      // Get logged-in user's details
      // const res = await axios.get(`${baseURL}`)
      // return res.data
      return response.data
    }

  } catch (err) {
    console.log('Error registering new user, ', err.message)
    return err.message
  }
})

// LOAD USER
export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  try {
    const response = await authService.login()
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error.message)
    return error.message
  }
})

// SLICES
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('Logout reducer')
      localStorage.removeItem('token')
      state.token = null
      state.isAuth = false
      state.isAdmin = false
      state.user = null
      state.status = 'idle'
      state.errors = null
    }
  },

  extraReducers: builder => {
    builder
    // LOGIN
    .addCase(login.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.isAuth = true
      state.isAdmin = action.payload.isAdmin
      state.token = localStorage.getItem('token')
      state.user = action.payload
      state.errors = null
    })
    .addCase(login.rejected, (state, action) => {
      state.status = 'failed'
      state.isAuth = false
      state.isAdmin = false
      state.token = null
      state.user = null
      state.errors = action.payload
    })

    // LOAD USER
    .addCase(loadUser.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.isAuth = true
      state.isAdmin = action.payload.isAdmin
      state.token = localStorage.getItem('token')
      state.user = action.payload
      state.errors = null
    })
    .addCase(loadUser.rejected, (state, action) => {
      state.status = 'failed'
      state.isAuth = false
      state.isAdmin = false
      state.token = null
      state.user = null
      state.errors = action.payload
    })

    // REGISTER
    .addCase(register.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(register.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.isAuth = true
      state.isAdmin = action.payload.isAdmin
      state.token = localStorage.getItem('token')
      state.user = action.payload
      state.errors = null
    })
    .addCase(register.rejected, (state, action) => {
      state.status = 'failed'
      state.isAuth = false
      state.isAdmin = false
      state.token = null
      state.user = null
      state.errors = action.payload
    })
  }
})

// Export selectors
export const getIsAuth = state => state.auth.isAuth
export const getIsAdmin = state => state.auth.isAdmin
export const getAuthUser = state => state.auth.user
export const getError = state => state.auth.error

// Export authSlice actions
export const { logout } = authSlice.actions

// Export reducer
export default authSlice.reducer

