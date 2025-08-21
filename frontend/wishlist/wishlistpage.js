import React from "react";
import "./wishlistpage.css";
import { useWishlist } from "../context/wishlistcontext";   
import { useCart } from "../context/CartContext";

function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
 
  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="empty-wishlist">Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-items">
          {wishlistItems.map((item) => (
            <li key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} className="wishlist-item-image" />
              <div className="wishlist-item-details">
                <h2>{item.name}</h2>
                <p>Price: {item.price}</p>
                <div className="wishlist-buttons">
                <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>Remove</button> 
                <button className="Add-cart-btn" onClick={() => addToCart(item)} disabled={isInCart(item.id)}>
                {isInCart(item.id) ? "Added to Cart" : "Add to Cart"}
              </button>
                </div> 
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistPage;