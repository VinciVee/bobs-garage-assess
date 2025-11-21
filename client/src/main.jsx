import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global Styling
import './styles/resets.css.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// React-redux
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { fetchAllProducts } from './slices/productSlice.js';
import { fetchUserList } from './slices/userSlice.js';
// fetch the products from the api
store.dispatch(fetchAllProducts())
store.dispatch(fetchUserList)

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
