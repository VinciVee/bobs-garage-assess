// Helpers used in redux state slices
// mutating is fine within Redux (immer)

export const handlePending = (state, action) => {
  // mutating is fine within Redux (immer)
  state.status = 'loading'
  state.loading = true
  state.error = null
}

export const handleRejected = (state, action) => {
  state.status = 'failed'
  state.loading = false
  state.error = action.payload
}

export const payloadError = (state, actionName) => {
  console.log(`Item could not be ${actionName}`)
  state.error = `Item could not be ${actionName}`
}

export const filterList = (list, id) => {
  return list.filter((item) => item.id !== id)
}

export const updateList = (list, updatedItem) => {
  const updatedList = list.map((item) => {
    item.id === updatedItem.id ?
    (item === updatedItem) : item
   })

   return updatedList
}
