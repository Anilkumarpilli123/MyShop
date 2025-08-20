import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css"; 


function CartPage() {
    const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
//    const product = products.find((product) => product.id === parseInt(id));

  const handleCheckout = (id) => {
   
    navigate(`/products/${id}`);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-content">
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>{item.price}</p>
              </div>
               <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                style={{ marginLeft: "20px", backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
              >
                Remove
              </button>
              <button className="checkout-btn" onClick={() => handleCheckout(item.id)} style={{ marginLeft: "20px", backgroundColor: "green", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
                Checkout 
              </button>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;

