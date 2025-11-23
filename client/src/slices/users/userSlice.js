// Holds state, actions and reducer for users
import { createSlice } from "@reduxjs/toolkit"
import { payloadError, handlePending, handleRejected, filterList, updateList } from "../../util/reduxHelpers"
import { fetchUserList, addUser, updateUser, deleteUser } from "./userThunks"

const initialState = {
  userList: [],
  user: {},
  status: 'idle',
  error: null
}

// REDUCERS ---------
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // FETCH ALL USERS
    .addCase(fetchUserList.pending, handlePending)
    .addCase(fetchUserList.rejected, handleRejected)
    .addCase(fetchUserList.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.error = null
      state.userList = action.payload
    })

    // ADD NEW USER
    .addCase(addUser.pending, handlePending)
    .addCase(addUser.rejected, handleRejected)
    .addCase(addUser.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "added")

      state.status = 'succeeded'
      state.error = null
      state.user = action.payload
      state.userList.push(action.payload)
    })

    // UPDATE USER
    .addCase(updateUser.pending, handlePending)
    .addCase(updateUser.rejected, handleRejected)
    .addCase(updateUser.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "updated")

      state.status = 'succeeded'
      state.user = action.payload
      state.error = null
      state.userList = updateList(state.userList, action.payload)
    })

    // DELETE USER
    .addCase(deleteUser.pending, handlePending)
    .addCase(deleteUser.rejected, handleRejected)
    .addCase(deleteUser.fulfilled, (state, action) => {
      if(!action.payload) return payloadError(state, "deleted")

      state.status = 'succeeded'
      // action.meta.arg is input to thunk, i.e. id
      state.userList = filterList(state.userList, action.meta.arg)
      state.error = null
    })
  }
})

// EXPORT SELECTORS
export const selectAllUsers = (state) => state.users.userList
export const getUserStatus = (state) => state.users.status
export const getUserError = (state) => state.users.error
export const selectUserById = (state, id) => state.users.userList.find(item => item.id === id)

// Export the reducer
export default userSlice.reducer

