import React, { useContext, useState, useEffect } from 'react';
import { BuyNowContext } from '../context/buynowcontext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BuyNowNavbar from './buynownavbar';
// import CheckoutFooter from '../footer/checkoutfooter';
import './buynowpage.css';

const BuyNowPage = () => {
    const navigate = useNavigate();
  const { buyNowItems, removeFromBuynow } = useContext(BuyNowContext);
  const [selectedItems, setSelectedItems] = useState([]); 
  
 

  // Initialize selectedItems to include all IDs when buyNowItems change
  useEffect(() => {
    setSelectedItems(buyNowItems.map(item => item.id));
  }, [buyNowItems]);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(buyNowItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const toggleItemSelection = (productId) => {
    setSelectedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handlePlaceOrder = () => {
    navigate("/address");
  }

  const allSelected = selectedItems.length === buyNowItems.length;

  const selectedbuyNowItems = buyNowItems.filter(item => selectedItems.includes(item.id));

 const totalMRP = selectedbuyNowItems.reduce((sum, item) => {
  const numericPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, ""));
  const qty = item.qty || 1;
  return sum + (isNaN(numericPrice) ? 0 : numericPrice * qty);
}, 0);

  const totalDiscount = 0;
  const totalAmount = totalMRP;
  const platformFee = selectedbuyNowItems.length > 0 ? 20 : 0;

 
  return ( 
    <div>
      <BuyNowNavbar />
    <div className="buy-now-container">
      {/* Left: Products */}
      <div className="products-section-buy-now">
        <h3 className='select-all-header'>
          <input
            type='checkbox'
            checked={allSelected}
            onChange={toggleSelectAll}
            style={{ marginRight: '10px' }}
          />
          Select All ({selectedItems.length}/{buyNowItems.length} Items Selected)
        </h3>

        {buyNowItems.map((item) => (
          <div className="product-card-buy-now" key={item.id}>
            <div className='checkbox-wrapper'>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItemSelection(item.id)}
              />
            </div>

            <Link to={`/products/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="clickable-product-img"
                style={{ cursor: "pointer" }}
              />
            </Link>

            <div className="product-details-buy-now">
              <h4>{item.brand}</h4>
              <p className="product-name">{item.name}</p>
              <p className="seller">Sold by: {item.seller || 'MyShop Seller'}</p>
              <div className="options">
                {["shoes", "shirts", "jacket", "hoodies"].includes(item.category) && item.size && (
                  <>
                  <span>Size: {item.selectedSize}</span>
                  <span>Qty: 1</span>
                  </>
                )}
                
                {/* For electronics */}
                {["mobile", "laptops", "handbag", "smartwatchs", "smartTvs"].includes(item.category) && item.color && (
                  <>
                  <span>Color: {item.selectedColor}</span>
                  <span>Qty: 1</span>
                  </>
                )}
                
                {/* For books and toys */}
                {["actiontoys", "remotecontroltoys", "softteddytoys", "fictionbooks", "personaldevelopmentbooks", "educationalbooks"].includes(item.category) && item.qty && (
                  <span>Qty: {item.selectedQty || 1}</span>
                )}
              </div>
              <div className="price">
                {item.price} <span className="striked">{item.originalPrice}</span>
              </div>
              <p className="delivery">🚚 Delivery in <strong>2 days</strong></p>
            </div>

            <button
              className="remove-button-buynow"
              onClick={() => removeFromBuynow(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Right: Summary */}
      <div className="summary-section">
        <h4>PRICE DETAILS ({selectedbuyNowItems.length} Items)</h4>
        <div className="summary-line">
          <span>Total MRP</span>
          <span>${totalMRP.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Discount on MRP</span>
          <span className="green">- ${totalDiscount}</span>
        </div>
        <div className="summary-line">
          <span>Coupon Discount</span>
          <span className="pink">Apply Coupon</span>
        </div>
        <div className="summary-line">
          <span>Platform Fee</span>
          <span>${platformFee}</span>
        </div>
        <div className="summary-line">
          <span>Shipping Fee</span>
          <span className="green">FREE</span>
        </div>
        <hr />
        <div className="summary-line total">
          <strong>Total Amount</strong>
          <strong>${(totalAmount + platformFee).toFixed(0)}</strong>
        </div>
        <button className="place-order-btn" onClick={handlePlaceOrder}>PLACE ORDER</button>
      </div>
    </div>
    {/* <CheckoutFooter /> */}
    </div>
  );
};

export default BuyNowPage;
