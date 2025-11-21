/**
 * src/slices/userSlice.js
 * Holds state, actions and reducer for users
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "../services/userService";
import axios from "axios";

const initialState = {
  userList: [],
  user: {},
  status: 'idle',
  errors: null,
  message: null
}

// ACTIONS ---------
// GET ALL USERS
export const fetchUserList = createAsyncThunk('users/FetchUserList', async() => {
  console.log('Fetching users....')
  try {
    const response = await userService.getAllUsers()
    console.log(response.data)
    return response.data
  } catch (error) {
    return error.message
  }
})

// ADD NEW USER
export const addNewUser = createAsyncThunk('users/AddNewUser', async(newUser) => {
  console.log('Adding a new user....')
  try {
    const response = await userService.addUser(newUser)
    console.log(response.data)
    return response.data
  } catch (error) {
    return error.message
  }
})

// UPDATE USER
export const updateUser = createAsyncThunk('users/UpdateUser', async({id, updatedUser}) => {
  console.log('Updating user: ', id)
  try {
    const response = await userService.updateUser({id, updatedUser})
    console.log(response.data)
    return response.data
  } catch (error) {
    return error.message
  }
})

// DELETE USER
export const deleteUser = createAsyncThunk('users/DeleteUser', async(id) => {
  console.log('Deleting user: ', id)
  try {
    const response = await userService.deleteUser(id)
    console.log(response.data)
    if (response.status === 200) return id
    return `${response.status}: ${response.statusText}`
  } catch (error) {
    return error.message
  }
})

// SLICES ---------
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  // EXTRA REDUCERS
  extraReducers: (builder) => {
    builder
    // Get All Users
    .addCase(fetchUserList.pending, (state, action) => {
      state.status = 'loading'
      state.message = 'loading'
      state.errors = null
      state.currentRequestId = action.meta.requestId
    })
    .addCase(fetchUserList.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.message = null
      state.errors = null
      state.userList = action.payload
      state.currentRequestId = null
    })
    .addCase(fetchUserList.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.error.message
      state.errors = action.error.message
    })
    // Add new user
    .addCase(addNewUser.pending, (state, action) => {
      state.status = 'loading'
      state.message = 'loading'
      state.errors = null
      state.currentRequestId = action.meta.requestId
    })
    .addCase(addNewUser.fulfilled, (state, action) => {
      if(!action.payload){
        console.log('User could not be added')
        state.message = 'User could not be added'
        return
      }
      state.user = action.payload
      state.message = null
      state.errors = null
      state.userList.push(action.payload)
    })
    .addCase(addNewUser.rejected, (state, action) => {
      state.message = action.error.message
      state.errors = action.error.message
      state.status = 'failed'
    })
    // Update a user
    .addCase(updateUser.pending, (state, action) => {
      state.status = 'loading'
      state.message = 'loading'
      state.errors = null
      state.currentRequestId = action.meta.requestId
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      if(!action.payload){
        console.log('User could not be updated')
        state.message = 'User could not be updated'
        return
      }
      state.message = null
      console.log(`User ${action.payload.userId} updated`)
      const list = state.userList.map((item) => {
        item.userId === action.payload.userId ?
        (item === action.payload) : item
       })
      state.user = action.payload
      state.errors = null
      state.userList = list
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.message = action.error.message
      state.errors = action.error.message
      state.status = 'failed'
    })
    // Delete a user
    .addCase(deleteUser.pending, (state, action) => {
      state.status = 'loading'
      state.message = 'loading'
      state.errors = null
      state.currentRequestId = action.meta.requestId
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      if(!action.payload){
        console.log('User could not be removed')
        state.message = 'User could not be removed'
        state.errors = action.payload
        return
      }
      state.message = null
      state.errors = null
      const { userId } = action.payload
      const list = state.productList.filter(item => item.userId !== userId)
      state.userList = list
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.message = action.error.message
      state.errors = action.error.message
      state.status = 'failed'
    })
  }
})

// EXPORT SELECTORS
export const selectAllUsers = (state) => state.users.userList
export const getUserStatus = (state) => state.users.status
export const getUserError = (state) => state.users.errors
export const getUserMessage = (state) => state.users.message
export const selectUserById = (state, userId) => state.users.userList.filter(item => item.userId === userId)

// Export the reducer
export default userSlice.reducer

