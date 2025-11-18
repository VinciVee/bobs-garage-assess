// Bring in needed components
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import './App.css';
// Bring in custom components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Products from "./components/pages/Products";
import AddProduct from './components/pages/AddProduct';
import EditProduct from './components/pages/EditProduct';

// import the Provider
import { DaisyProvider } from './context/DaisyContextComponent';

function App() {
  // state and even functions removed after adding Provider

  // After adding provider, we need to wrap our application in the new provider
  return (
    <DaisyProvider>
      <Router>
        <Header branding="Daisy's Flowers"/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='products' element={<Products />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='edit/:id' element={<EditProduct />} />
            {/* <Route path='*' element={<NotFound />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </DaisyProvider>
  )
}

export default App;
