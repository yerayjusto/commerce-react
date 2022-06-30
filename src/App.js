import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { NavBar, Products, Cart, Checkout, Loading } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    try {
    const { data } = await commerce.products.list();
    setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  return (
    <Router>
      <div>
        <NavBar totalItems={cart.total_items} />
        <Routes>
          <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
          <Route exact path="/cart" element={
            <Cart 
              cart={cart} 
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />} 
          />
          <Route exact path="/checkout" element={ !cart.id ? <Loading /> : 
            <Checkout 
              cart={cart} 
              order={order} 
              onCaptureCheckout={handleCaptureCheckout} 
              error={errorMessage} />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
