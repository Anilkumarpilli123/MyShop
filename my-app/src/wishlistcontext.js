import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlistItems");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);