// Import npm packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Import pages
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
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
import Users from './pages/admin/Users';
import AddUser from './pages/admin/AddUser';
import EditUser from './pages/admin/EditUser';
import ChangeImage from './pages/admin/ChangeImage';
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
        <Route path='admin' element={<Dashboard />}>
          <Route path='users' element={<Users />} />
          <Route path='users-add' element={<AddUser />} />
          <Route path='users-edit/:id' element={<EditUser />} />
          <Route path='images-change' element={<ChangeImage />} />
        </Route>

        {/* Not Found - 404 */}
        <Route path='*' element={<NotFound />} />

      </Route>
    </Routes>
  )
}

export default App;
