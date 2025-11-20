// Import npm packages
import { BrowserRouter as Router, Route, Routes } from 'react-router'

// Import pages
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/product/Products";
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import NotFound from './pages/NotFound'

function App() {

  return (
    <Router>
      <Header branding="Bob's Garage"/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='products' element={<Products />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='edit/:id' element={<EditProduct />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
