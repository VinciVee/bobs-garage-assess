//

import { createSlice } from '@reduxjs/toolkit'
import { handlePending, handleRejected, payloadError } from '../../util/reduxHelpers'
import { fetchImageURL, fetchImageList, uploadImage } from './adminThunks'

// INITIAL STATE
const initialState = {
  homepageImage: localStorage.getItem("backImage") || '',
  imageList: [],
  status: 'idle',
  error: null
}

// REDUCER
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setHomepageImage(state, action) {
      if(!action.payload) return payloadError(state, "set the homepage background image")
      state.homepageImage = action.payload
      localStorage.setItem("backImage", action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
    // FETCH IMAGE URL
    .addCase(fetchImageURL.pending, handlePending)
    .addCase(fetchImageURL.rejected, handleRejected)
    .addCase(fetchImageURL.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "fetched [URL]")

      state.status = 'succeeded'
      state.error = null
      state.homepageImage = action.payload
      localStorage.setItem('backImage', action.payload)
    })

    // FETCH IMAGE LIST
    .addCase(fetchImageList.pending, handlePending)
    .addCase(fetchImageList.fulfilled, (state,action) => {
      if(!action.payload) return payloadError(state, "fetched [Image List]")

      state.status = 'succeeded'
      state.error = null
      state.imageList = action.payload
    })
    .addCase(fetchImageList.rejected, (state,action) => {
      state.status = 'failed'
      state.error = action.error.message
      state.imageList = null
    })

    // UPLOAD IMAGE
    .addCase(uploadImage.pending, handlePending)
    .addCase(uploadImage.rejected, handleRejected)
    .addCase(uploadImage.fulfilled, (state,action) => {
      if(!action.payload) return payloadError(state, "uploaded")
      state.status = 'succeeded'
      state.error = null
      state.imageList.push(action.payload)
    })
  }
})

// Export Selectors
export const selectHomepageImage = state => state.admin.homepageImage
export const selectImageList = state => state.admin.imageList
// Export Actions
export const { setHomepageImage } = adminSlice.actions
// Export Reducer
export default adminSlice.reducer
