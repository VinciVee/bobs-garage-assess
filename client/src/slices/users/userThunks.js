import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/userService'

// GET ALL USERS REQUEST
export const fetchUserList = createAsyncThunk(
  'users/fetchUserList',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching users....')

      const response = await userService.getAllUsers()
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// GET ONE USER Request
// async function getUserById(id){
//   try {
//     console.log('Fetching user....')
//     const response = api.get(`/api/users/${id}`)
//     console.log('response:\n', response.data)
//     return response.data
//   } catch (error) {
//     return error.message
//   }
// }

// ADD USER Request
export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser, thunkAPI ) => {
    try {
      console.log('Adding a new user....')
      const response = await userService.addUser(newUser)

      console.log('response:\n', response.data)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// UPDATE USER Request
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({id, data}, thunkAPI) => {
    try {
      console.log('Updating user: ', id)
      const response = await userService.updateUser(id, data)

      console.log('response:\n', response.data)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// DELETE USER Request
export const deleteUser = createAsyncThunk(
  'users/DeleteUser',
  async (id, thunkAPI) => {
    try {
      console.log('Deleting user: ', id)
      const response = await userService.deleteUser(id)

      console.log('response:\n', response.data)

      if (response.status === 200) return id
      return `${response.status}: ${response.statusText}`

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
