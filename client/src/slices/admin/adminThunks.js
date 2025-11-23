import { createAsyncThunk } from '@reduxjs/toolkit'
import adminService from '../../services/adminService'

// UPLOAD IMAGE
export const uploadImage = createAsyncThunk(
  'admin/uploadImage',
  async (formData, thunkAPI) => {
    console.log('Uploading image...')
    try {
      const response = await adminService.uploadImage(formData)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// GET IMAGE URL
export const fetchImageURL = createAsyncThunk(
  'admin/fetchImageURL',
  async (imageName, thunkAPI) => {
    console.log('fetching image url...')
    try {
      const response = await adminService.getImageURL(imageName)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// GET IMAGE LIST
export const fetchImageList = createAsyncThunk(
  'admin/fetchImageList',
  async(_, thunkAPI) => {
    console.log('getting image list...')
    try {
      const response = await adminService.getImageList()
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
