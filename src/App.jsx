import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import ProductDetail from './components/Product/ProductDetail';
import Checkout from './pages/Checkout';
import LimitedEdition from './components/LimitedEdition';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="app">
        <Navbar user={user} cartCount={cart.length} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
            <Route path="/limited-edition" element={<LimitedEdition cart={cart} setCart={setCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
