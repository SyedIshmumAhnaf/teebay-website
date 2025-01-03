// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import ProductListing from "./pages/ProductListing";
import AddProductForm from "./pages/AddProductForm";
import EditProduct from './pages/EditProduct';
import BrowseProducts from './pages/BrowseProducts';
import './styles/auth.css';
import './styles/ProductList.css';

const App = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
    }

  return (
    <Router>
      <MainLayout>
        <h1>Hi, Welcome to react frontend.</h1>
        <Link to='/login'>Login</Link> 
        <Link to='/register'>Register</Link> 
        <Link to="/all-products">All Products</Link> 
        <Link to="/add-product">Add Product</Link> 
        <Link to="/browse-products">Browse Listings</Link>
        <button onClick={handleLogout}>Logout</button>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/all-products" element={<ProductListing />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/browse-products" element={<BrowseProducts />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;