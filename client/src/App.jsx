// Import npm packages
import { Route, Routes } from 'react-router-dom'

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from './pages/NotFound'
// Products Routes
import Products from "./pages/product/Products";
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
// Auth Routes
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'
// Admin Routes
import Dashboard from './pages/admin/Dashboard';
// Components
import Layout from './components/layout/Layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />

        {/* Products */}
        <Route path='products' element={<Products />} />
        <Route path='add-product' element={<AddProduct />} />
        <Route path='edit/:id' element={<EditProduct />} />

        {/* Auth */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/* Admin */}
        <Route path='admin' element={<Dashboard />} />

        {/* Not Found - 404 */}
        <Route path='*' element={<NotFound />} />

      </Route>
    </Routes>
  )
}

export default App;
