// React-redux
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { fetchAllProducts } from './slices/products/productThunks.js';
import { setHomepageImage } from './slices/admin/adminSlice.js';
import { fetchImageList } from './slices/admin/adminThunks.js'
import { fetchUserList } from './slices/users/userThunks.js';
import { loadUser } from './slices/auth/authThunks.js'

// React*
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Global Styling
import './styles/resets.css.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// App component
import App from './App.jsx';

// Fetch from API if not in state
const state = store.getState()
if(!state.products.productList.length) {store.dispatch(fetchAllProducts())}
if(!state.users.userList.length) {store.dispatch(fetchUserList())}
if(!state.admin.imageList.length) {store.dispatch(fetchImageList())}

// save logged-in user in localStorage
const token = localStorage.getItem('token')
if(!token){ store.dispatch(loadUser()) }

// save background in localStorage
const backImage = localStorage.getItem('backImage')
if(!backImage){ store.dispatch(setHomepageImage(backImage))}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
