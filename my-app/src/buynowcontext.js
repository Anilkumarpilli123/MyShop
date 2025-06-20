// src/context/BuyNowContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const BuyNowContext = createContext();

export const BuyNowProvider = ({ children }) => {
  const [buyNowItems, setBuyNowItems] = useState(() =>{
    const storedBuynow = localStorage.getItem("buyNowItems");
    return storedBuynow ? JSON.parse(storedBuynow) : [];
  });

  useEffect(() => {
    localStorage.setItem("buyNowItems", JSON.stringify(buyNowItems));
  }, [buyNowItems]);

   const addToBuyNow = (product) => {
  const newItem = {
  ...product,
   selectedSize: product.selectedSize || null,
    selectedColor: product.selectedColor || null,
    selectedQty: product.selectedQty || 1
}; 
    if (!buyNowItems.some(item => item.id === product.id)) {
      setBuyNowItems([...buyNowItems, newItem]);
    }
  };

  const removeFromBuynow = (productId) => {
    setBuyNowItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInBuynow = (productId) => {
    return buyNowItems.some((item) => item.id === productId);
  };

  const saveOrder = (items, totalAmount) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      items: items.map(item => ({
        ...item,
        // Ensure we have all necessary product details
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: item.selectedQty || 1,
        size: item.selectedSize,
        color: item.selectedColor
      })),
      total: totalAmount,
      date: new Date().toLocaleString(),
      status: "Confirmed"
    };
    
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
    setBuyNowItems([]); // Clear buy now items after order is placed
  };

  return (
    <BuyNowContext.Provider value={{ buyNowItems, addToBuyNow, removeFromBuynow, isInBuynow, saveOrder }}>
      {children}
    </BuyNowContext.Provider>
  );
};

export const useBuynow = () => useContext(BuyNowContext);
