// Holds state, actions and reducer for products

import { createSlice } from "@reduxjs/toolkit"
import { register, login, loadUser } from "./authThunks"
import { handlePending, payloadError } from "../../util/reduxHelpers"

// INITIAL STATE
const initialState = {
  user: {},
  token: '',
  isAuth: false,
  isAdmin: false,
  status: 'idle', // idle, loading, succeeded, failed
  error: null
}

// SLICES
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('Logout reducer')
      localStorage.removeItem('token')
      state.user = null
      state.token = null
      state.isAuth = false
      state.isAdmin = false
      state.status = 'idle'
      state.error = null
    }
  },

  extraReducers: builder => {
    builder
    // LOGIN
    .addCase(login.pending, handlePending)
    .addCase(login.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "... [login]")
      console.log('(AuthSlice - login payload: ', action.payload.isAdmin)
      state.status = 'succeeded'
      state.isAuth = true
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
    .addCase(loadUser.pending, handlePending)
    .addCase(loadUser.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "loaded")

      console.log('(AuthSlice - LoadUser payload: ', action.payload.isAdmin)
      state.status = 'succeeded'
      state.isAuth = true
      state.isAdmin = action.payload.isAdmin || false
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
    .addCase(register.pending, handlePending)
    .addCase(register.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "registered")
      state.status = 'succeeded'
      state.isAuth = true
      state.isAdmin = action.payload.isAdmin || false
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
export const getIsAuth = (state) => state.auth.isAuth
export const getIsAdmin = (state) => state.auth.isAdmin
export const getAuthUser = (state) => state.auth.user
export const getError = (state) => state.auth.error

// Export authSlice actions
export const { logout } = authSlice.actions

// Export reducer
export default authSlice.reducer

