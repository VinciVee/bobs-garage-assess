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
  error: null
}

// ACTIONS
// LOGIN
export const login = createAsyncThunk('auth/login',
  async ({ email, password }) => {
  console.log('Logging in... authSlice')
  try {
    const response = await authService.login({ email, password })

    if(response.data){
      if(response.status === 400){
        throw Error({ message: response.data })
      }
      localStorage.setItem('token', response.data.token)
      setAuthToken(localStorage.token)
      // Get logged-in user's details
      const res = await authService.loadUser()
      return res.data
    }
  } catch (err) {
    console.log('Error logging in, ', err.message)
    return err.message
  }
})

// REGISTER
export const register = createAsyncThunk('auth/register', async(newUser) => {
  console.log('Registering new user...authSlice')
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
      const res = await authService.loadUser()
      return res.data
    }
  } catch (err) {
    console.log('Error registering new user, ', err.message)
    return err.message
  }
})

// GET LOADUSER
export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  try {
    const response = await authService.loadUser()
    console.log('loadUser (authSlice) response data: ',response.data)
    return response.data
  } catch (err) {
    console.log(err.message)
    return err.message
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
      state.error = null
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
      console.log('(AuthSlice - login payload: ', action.payload.isAdmin)
      state.isAdmin = action.payload.isAdmin
      state.token = localStorage.getItem('token')
      state.user = action.payload
      state.error = null
    })
    .addCase(login.rejected, (state, action) => {
      state.status = 'failed'
      state.isAuth = false
      state.isAdmin = false
      state.token = null
      state.user = null
      state.error = action.payload
    })

    // LOAD USER
    .addCase(loadUser.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.isAuth = true
      state.isAdmin = action.payload.isAdmin
      console.log('(AuthSlice - LoadUser payload: ', action.payload.isAdmin)
      state.user = action.payload
      state.error = null
    })
    .addCase(loadUser.rejected, (state, action) => {
      state.status = 'failed'
      state.isAuth = false
      state.isAdmin = false
      state.token = null
      state.user = null
      state.error = action.payload
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
      state.error = null
    })
    .addCase(register.rejected, (state, action) => {
      state.status = 'failed'
      state.isAuth = false
      state.isAdmin = false
      state.token = null
      state.user = null
      state.error = action.payload
    })
}})

// Export selectors
export const getIsAuth = state => state.auth.isAuth
export const getIsAdmin = state => state.auth.isAdmin
export const getAuthUser = state => state.auth.user
export const getError = state => state.auth.error

// Export authSlice actions
export const { logout } = authSlice.actions

// Export reducer
export default authSlice.reducer

