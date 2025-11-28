// Import npm packages
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { lightTheme, darkTheme } from './styles/themes.css.js'

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
import EditUser from './pages/admin/EditUser';
// Components
import Layout from './components/layout/Layout';

function App({ initialTheme }) {
  const [theme, setTheme] = useState(initialTheme)

  // Sync DOM + localStorage whenever theme changes
  useEffect(() => {
    document.body.classList.remove(theme === 'light' ? darkTheme : lightTheme)
    document.body.classList.add(theme === 'dark' ? darkTheme : lightTheme)

    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<Layout theme={theme} setTheme={setTheme}/>}>
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
          <Route path='users-edit/:id' element={<EditUser />} />
        </Route>

        {/* Not Found - 404 */}
        <Route path='*' element={<NotFound />} />

      </Route>
    </Routes>
  )
}

export default App;
