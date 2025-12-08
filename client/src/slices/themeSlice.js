import { createSlice } from "@reduxjs/toolkit"

const storedTheme = localStorage.getItem('theme')

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const initialState = {
  value: storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : prefersDark ? 'dark' : 'light',
}

// REDUCERS
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload
    },
    toggleTheme: (state, action) => {
      state.value = state.value === 'dark' ? 'light' : 'dark'
    }
  }
})

// actions
export const { setTheme, toggleTheme } = themeSlice.actions
// selectors
export const getTheme = (state) => state.theme.value
// reducer
export default themeSlice.reducer
