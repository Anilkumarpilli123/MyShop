 import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {

    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => { 
    const exists = cartItems.find(item => item.id === product.id);
    if (!exists) {
      setCartItems([...cartItems, product]);
    }
  };
  
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
