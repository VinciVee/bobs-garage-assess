/**
 * Store.js
 * Creates a store to hold the states
 *
 */
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import themeReducer from '../slices/themeSlice'
import productReducer from '../slices/products/productSlice'
import authReducer from '../slices/auth/authSlice'
import userReducer from '../slices/users/userSlice'
import adminReducer from '../slices/admin/adminSlice'
import { productsApi } from '../slices/products/productApi'

import { darkTheme, lightTheme } from '../styles/themes.css'

// const listenerMiddleware = createListenerMiddleware()

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    products: productReducer,
    auth: authReducer,
    users: userReducer,
    admin: adminReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
})

// THEME SUBSCRIBER
function applyThemeToDom(theme) {
  const root = document.documentElement;

  // remove all known theme classes
  root.classList.remove(darkTheme, lightTheme);

  // add new theme
  root.classList.add(theme === 'dark' ? darkTheme : lightTheme);

  // persist to localStorage
  localStorage.setItem('theme', theme);
}

// Subscribe once, after store creation
let prevTheme;
store.subscribe(() => {
  const currentTheme = store.getState().theme.value;

  if (currentTheme !== prevTheme) {
    applyThemeToDom(currentTheme);
    prevTheme = currentTheme;
  }
});
