import React from "react";
import "./checkoutfooter.css"; 
import { Link } from "react-router-dom";

const CheckoutFooter = () => {
  return (
    <footer className="checkout-footer">
      <div className="security-info">
        <div className="security-badge">
          <span>256-bit SSL</span>
          <span>Secure Payment</span>
        </div>
        
        <div className="payment-methods">
          <a href="https://www.shift4shop.com/credit-card-logos.html" target="_blank" rel="noopener noreferrer">
            <img 
              alt="Credit Card Logos" 
              title="Credit Card Logos" 
              src="https://www.shift4shop.com/images/credit-card-logos/cc-lg-5_b.png" 
              width="518" 
              height="59" 
            />
          </a>
        </div>
      </div>

      <div className="checkout-help">
        <div className="cash-on-delivery">
          <span>Cash on Delivery Available</span>
        </div>
        <div className="help-link">
          <Link href="#">Need Help? Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default CheckoutFooter;