import React, { useState } from "react";
import { useContext, useEffect } from 'react';
import { BuyNowContext } from '../context/buynowcontext';
import "./addresspage.css";
import { useNavigate } from "react-router-dom";
import BuyNowNavbar from "../buynow/buynownavbar";
// import CheckoutFooter from "../footer/checkoutfooter";

const AddressPage = () => {
  const navigate = useNavigate();
    const { buyNowItems, removeFromBuynow } = useContext(BuyNowContext);
    const [selectedItems, setSelectedItems] = useState([]); 
    const [errors, setErrors] = useState({});

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    fullAddress: "",
    city: "",
    state: "",
    landmark: "",
    altPhone: "",
    addressType: "Home"
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Submitted:", address);
    navigate("/payment");  
  }; 

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
  
  const validateAddress = () => {
  const errors = {};
  if (!address.name.trim()) errors.name = "Name is required"; else
  if (!address.mobile.trim()) errors.mobile = "Mobile number is required"; else
  if (!address.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(address.mobile)) {
    errors.mobile = "Enter valid 10-digit mobile number";
  } else
  if (!address.pincode.trim()) errors.pincode = "Pincode is required"; else
  if (!address.pincode.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(address.pincode)) {
    errors.pincode = "Enter 6-digit pincode";
  } else
  if (!address.locality.trim()) errors.locality = "Locality is required"; else
  if (!address.fullAddress.trim()) errors.fullAddress = "Full address is required"; else
  if (!address.city.trim()) errors.city = "City is required"; else
  if (!address.state.trim()) errors.state = "State is required";
  return errors;
};

  const handlecontopay = (e) => {
    e.preventDefault();
    const validationErrors = validateAddress();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0){  
        navigate("/paymentpage");
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  document.getElementById('page-top')?.scrollIntoView({ behavior: 'smooth' });


  return (
    <div id="page-top">
      <BuyNowNavbar />
    <div >
    <div className="address-container">
      <h2>Select Delivery Address</h2>
      <form className="address-form">
      <div className="row">
        <div className="input-wrapper">
          <input name="name" type="text" placeholder="Full Name" value={address.name} onChange={handleChange} autoComplete="new_name"/>
          {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="input-wrapper">
          <input name="mobile" type="tel" placeholder="Mobile Number" value={address.mobile} maxLength="10" onChange={(e) => {const onlyNums = e.target.value.replace(/\D/g, ""); setAddress({ ...address, mobile: onlyNums }); }} autoComplete="new_number"/>
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        </div>

        <div className="row">
        <div className="input-wrapper">
          <input name="pincode" type="tel" placeholder="Pincode" value={address.pincode} maxLength="6" onChange={(e) => {const onlyNums = e.target.value.replace(/\D/g, ""); setAddress({ ...address, pincode: onlyNums });}} autoComplete="new_pincode"/>
          {errors.pincode && <span className="error">{errors.pincode}</span>}
          </div>
          <div className="input-wrapper">
          <input name="locality" type="text" placeholder="Locality" value={address.locality} onChange={handleChange} autoComplete="new_locality"/>
          {errors.locality && <span className="error">{errors.locality}</span>}
        </div>
        </div>
         
         <div className="input-wrapper full-width">
            <textarea name="fullAddress" rows="3" id="Fulladd" placeholder="Address (Area and Street)" value={address.fullAddress} onChange={handleChange} autoComplete="new_address"></textarea>
            {errors.fullAddress && <span className="error">{errors.fullAddress}</span>}
         </div>
        
        
        <div className="row">
        <div className="input-wrapper">
          <input name="city" type="text" placeholder="City/District/Town" value={address.city} onChange={handleChange} autoComplete="new_city"/>
          {errors.city && <span className="error">{errors.city}</span>}
          </div>
          <div className="input-wrapper">
          <input name="state" type="text" placeholder="State" value={address.state} onChange={handleChange} autoComplete="new_state"/>
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
        </div>

        <div className="row">
        <div className="input-wrapper">
          <input name="landmark" type="text" placeholder="Landmark (Optional)" onChange={handleChange} autoComplete="new_landmark"/>
          </div>
          <div className="input-wrapper">
          <input name="altPhone" type="tel" placeholder="Alternate Phone (Optional)" maxLength="10" onChange={handleChange} autoComplete="new_altphone"/>
        </div>
        </div>
      
        

        <div className="address-type">
          <label>
            <input type="radio" name="addressType" value="Home" checked={address.addressType === "Home"} onChange={handleChange} /> Home
          </label>
          <label>
            <input type="radio" name="addressType" value="Work" checked={address.addressType === "Work"} onChange={handleChange} /> Work
          </label>
        </div> 
        {/* <button type="submit" className="submit-btn">Save and Deliver Here</button> */}
      </form>


      <div className="summary-section-add">
        <h4>PRICE DETAILS ({selectedbuyNowItems.length} Items)</h4>
        <div className="summary-line-add">
          <span>Total MRP</span>
          <span>${totalMRP.toFixed(2)}</span>
        </div>
        <div className="summary-line-add">
          <span>Discount on MRP</span>
          <span className="green-add">- ${totalDiscount}</span>
        </div>
        <div className="summary-line-add">
          <span>Coupon Discount</span>
          <span className="pink-add">Apply Coupon</span>
        </div>
        <div className="summary-line-add">
          <span>Platform Fee</span>
          <span>${platformFee}</span>
        </div>
        <div className="summary-line-add">
          <span>Shipping Fee</span>
          <span className="green-add">FREE</span>
        </div>
        <hr />
        <div className="summary-line total-add">
          <strong>Total Amount</strong>
          <strong>${(totalAmount + platformFee).toFixed(0)}</strong>
        </div>
        <button className="btn-add" onClick={handlecontopay}>CONTINUE TO PAYMENT</button>
      </div>
      
    </div>
    </div>
    {/* <CheckoutFooter /> */}
    </div>
  );
};

export default AddressPage;
