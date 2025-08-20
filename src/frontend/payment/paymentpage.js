import React, { useState, useContext } from "react";
import { useRef } from "react";
import { BuyNowContext } from "../context/buynowcontext";
import "./paymentpage.css";
import { useNavigate } from "react-router-dom";
import BuyNowNavbar from "../buynow/buynownavbar";
// import CheckoutFooter from "../footer/checkoutfooter";
import qrcodescan from "../assets/qrcodescan.jpg";
import paylater from "../assets/paylater.png";
import wallet from "../assets/wallet.png";

const PaymentPage = () => {
  const navigate = useNavigate();
  const detailsRef = useRef(null);
  const { buyNowItems } = useContext(BuyNowContext);
  const [selectedMethod, setSelectedMethod] = useState(""); 
  const [pendingMethod, setPendingMethod] = useState("");
  const [pageToastMsg, setPageToastMsg] = useState("");
  const [codOption, setCodOption] = useState("");
  const [upiOption, setUpiOption] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiIdError, setUpiIdError] = useState(""); 
  const [cardDetails, setCardDetails] = useState({
  number: "",
  name: "",
  expiry: "",
  cvv: ""
});
const [cardErrors, setCardErrors] = useState({}); 
const [selectedEmi, setSelectedEmi] = useState("");
const [selectedBank, setSelectedBank] = useState("");



  // Calculate total amount function
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const numericPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, ""));
      const qty = item.qty || 1;
      return sum + (isNaN(numericPrice) ? 0 : numericPrice * qty);
    }, 0);
  };

  const handlePaymentSelection = (method) => {
    setSelectedMethod(method);

    // Scroll to details section on mobile
   setTimeout(() => {
    if (window.innerWidth <= 768 && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 200);
  };

  const PageToast = ({ message, onClose, isUPI }) => {
    return (
      <div className={`page-toast-notification ${isUPI ? 'upi-toast' : ''}`}>
        <span>{message}</span>
        <button className="page-toast-btn" onClick={onClose}>OK</button>
      </div>
    );
  };

  const requestMethodChange = (method) => {
    setPendingMethod(method);
    setPageToastMsg("Order Placed!");
  };

  const handleToastClose = () => {
    setSelectedMethod(pendingMethod); 
    setPageToastMsg("");
    if (pendingMethod === "cod") {
      const totalAmount = calculateTotal(buyNowItems);
      const platformFee = buyNowItems.length > 0 ? 20 : 0;
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const newOrder = {
        items: buyNowItems,
        date: new Date().toISOString(),
        total: totalAmount + platformFee, 
      };
      localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
      navigate("/booking-confirmed");
    }
    setPendingMethod("");
  };

  const totalMRP = calculateTotal(buyNowItems);
  const totalDiscount = 0;
  const totalAmount = totalMRP;
  const platformFee = buyNowItems.length > 0 ? 20 : 0;

  const validateCardDetails = () => {
  const errors = {};

  // Card Number: Required, 19 digits, only numbers & spaces
  const cardNumberDigits = cardDetails.number.replace(/\s+/g, "");
  if (!cardDetails.number.trim()) {
    errors.number = "Card number is required";
  } else if (!/^\d{16,19}$/.test(cardNumberDigits)) {
    errors.number = "Enter a valid 16 digit card number";
  }

  // Name on Card: Required, alphabets & space only
  if (!cardDetails.name.trim()) {
    errors.name = "Name on card is required";
  } else if (!/^[A-Za-z ]+$/.test(cardDetails.name)) {
    errors.name = "Only alphabets allowed";
  }

  // Expiry: Required, MM/YY format, numbers only, valid month
  if (!cardDetails.expiry.trim()) {
    errors.expiry = "Expiry date is required";
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
    errors.expiry = "Format should be MM/YY";
  }

  // CVV: Required, numbers only, 3 or 4 digits
  if (!cardDetails.cvv.trim()) {
    errors.cvv = "CVV is required";
  } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
    errors.cvv = "CVV must be 3 or 4 digits";
  }

  setCardErrors(errors);
  return Object.keys(errors).length === 0;
};

const generateEmiOptions = (total) => {
  const emiDurations = [3, 6, 9, 12]; // in months
  return emiDurations.map((months) => {
    const interestRate = 0.10; // 10% annual
    const monthlyRate = interestRate / 12;

    // EMI Formula: E = P × r × (1 + r)^n / ((1 + r)^n - 1)
    const r = monthlyRate;
    const n = months;
    const p = total;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return {
      months,
      monthlyAmount: emi.toFixed(2),
      totalPayable: (emi * n).toFixed(2),
    };
  });
};

  return (
    <div>
      <BuyNowNavbar />
    <div className="payment-container"> 
      <div className="payment-left">
        <h3>Choose Payment Mode</h3> 
        <div className="payment-options">
          {[
            { id: "cod", label: "Cash On Delivery (Cash/UPI)", icon: "💵"  },
            { id: "upi", label: "UPI (Pay via any App)", icon: "🔗" },
            { id: "card", label: "Credit/Debit Card", icon: "💳", offer: "6 Offers" },
            { id: "later", label: "Pay Later", icon: "📅" },
            { id: "wallet", label: "Wallets", icon: "👛", offer: "1 Offer" },
            { id: "emi", label: "EMI", icon: "📈" },
            { id: "net", label: "Net Banking", icon: "🏦", offer: "1 Offer" }
          ].map((method) => (
            <div
              key={method.id}
              className={`payment-method ${selectedMethod === method.id ? "active" : ""}`}
              onClick={() => handlePaymentSelection(method.id)}
            >
              <span className="icon">{method.icon}</span>
              {method.label}
              {method.offer && <span className="offer">{method.offer}</span>}
            </div>
          ))}
        </div>
      </div>
     
      {selectedMethod && (
        <div className="payment-cod-details" ref={detailsRef}>
          <h4>
            {selectedMethod === "cod" && "Cash On Delivery (Cash/UPI)"}
            {selectedMethod === "upi" && "Pay Using UPI"}
            {selectedMethod === "card" && "Credit/Debit Card"}
            {selectedMethod === "later" && "Buy Now Pay Later"}
            {selectedMethod === "wallet" && "Link to Wallet"}
            {selectedMethod === "emi" && "Set EMI"}
            {selectedMethod === "net" && "Select Bank"}
          </h4>

          {selectedMethod === "cod" && (
            <label>
              <input type="radio" name="cod" value="cash" checked={codOption === "cash"} onChange={(e) => setCodOption(e.target.value)} /> Cash on Delivery (Cash/UPI)
            </label>
          )}

          {selectedMethod === "upi" && (
            <div className="upi-options">
              <label>
                <input type="radio" name="upi" value="scan" checked={upiOption === "scan"} onChange={(e) => {setUpiOption(e.target.value); setUpiId(""); setUpiIdError("");}} /> Scan QR Code (App will open)
              </label>
              {upiOption === "scan" && (
                <div className="qr-image-container">
                  <img src={qrcodescan} alt="Scan QR Code" className="qr-image" />
                  <p>Scan this QR with any UPI app to pay</p>
                </div>
              )}
              <br />
              <label>
                <input type="radio" name="upi" value="enter" checked={upiOption === "enter"} onChange={(e) => {setUpiOption(e.target.value); setUpiIdError("");}} /> Enter UPI ID manually
              </label>
              {upiOption === "enter" && (
                <div className="upi-id-input"> 
                  <input type="text" id="upi-id" placeholder="Enter your UPI ID" pattern="^[\w.-]+@[\w.-]+$" value={upiOption === "enter" ? upiId : ""} onChange={(e) => {setUpiId(e.target.value); if(e.target.value.trim() !== ""){ setUpiIdError("");}}} required />
                  {upiIdError && (
                    <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{upiIdError}</p>
                  )}
                </div>
              )}
            </div>
          )}
          
          {pageToastMsg && <PageToast message={pageToastMsg} onClose={handleToastClose} isUPI={pendingMethod === "upi"}/>}

       {selectedMethod === "card" && (
  <div className="card-details">
    <h5 style={{ marginBottom: "10px", color: "#555" }}>
      Please Ensure your card can be used for online transactions.
    </h5>

    {/* Card Number */}
    <div className="card-input-with-icon">
      <input
        type="text"
        placeholder="Card Number"
        className="card-input"
        maxLength={16}
        value={cardDetails.number}
        onChange={(e) => {
          const val = e.target.value.replace(/[^0-9 ]/g, "");
          setCardDetails({ ...cardDetails, number: val });
          setCardErrors({ ...cardErrors, number: "" });
        }}
      />
      <span className="card-icon">💳</span>
    </div>
    {cardErrors.number && <p className="error-text">{cardErrors.number}</p>}

    {/* Name on Card */}
    <input
      type="text"
      placeholder="Name on card"
      className="card-input"
      value={cardDetails.name}
      onChange={(e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 16);
        const formatted = value.replace(/(.{4})/g, "$1 ").trim();
        setCardDetails({ ...cardDetails, name: formatted });
        setCardErrors({ ...cardErrors, name: "" });
      }}
    />
    {cardErrors.name && <p className="error-text">{cardErrors.name}</p>}

    {/* Expiry and CVV */}
    <div style={{ display: "flex", gap: "10px" }}>
     <input
  type="text"
  placeholder="MM/YY"
  className="card-input"
  value={cardDetails.expiry}
  onFocus={(e) => {
    if (!e.target.value) {
      e.target.placeholder = "MM/YY"; // Show MM/YY on focus if empty
    }
  }}
  onBlur={(e) => {
    if (!e.target.value) {
      e.target.placeholder = "Expire (MM/YY)";
    }
  }}
  onChange={(e) => {
    let val = e.target.value.replace(/[^\d]/g, ""); // Only digits

    // Auto-add slash after 2 digits
    if (val.length > 1) {
      val = val.slice(0, 2) + "/" + val.slice(2, 4);
    }

    // Limit max length
    if (val.length > 5) val = val.slice(0, 5);

    setCardDetails({ ...cardDetails, expiry: val });
    setCardErrors({ ...cardErrors, expiry: "" });
  }}
/> 
      <input
        type="text"
        placeholder="CVV"
        className="card-input"
        maxLength={3}
        value={cardDetails.cvv}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "");
          setCardDetails({ ...cardDetails, cvv: val });
          setCardErrors({ ...cardErrors, cvv: "" });
        }}
      />
    </div>
    {cardErrors.expiry && <p className="error-text">{cardErrors.expiry}</p>}
    {cardErrors.cvv && <p className="error-text">{cardErrors.cvv}</p>}

    {/* Pay Now Button */}
    <button
      className="action-button"
      style={{ marginTop: "20px" }}
      onClick={() => {
        if (validateCardDetails()) {
          requestMethodChange("cod");  
        }
      }}
    >
      PAY NOW
    </button>
  </div>
)}

{selectedMethod === "later" && (
  <div className="paylater-option">
    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
      <input type="radio" name="paylater" checked readOnly />
      <img src={paylater} alt="Pay Later" style={{ width: "80px", borderRadius: "8px" }} />
      <span style={{ fontWeight: "bold", fontSize: "15px" }}>Pay Later with Credit Provider</span>
    </label>
    <p style={{ marginTop: "10px", color: "#555", fontSize: "14px" }}>
      Buy now and pay later through our credit partner.
    </p>
    <button className="action-button" onClick={() => requestMethodChange("cod")}>
      Continue with Pay Later
    </button>
  </div>
)}

{selectedMethod === "wallet" && (
  <div className="wallet-option">
    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
      <input type="radio" name="wallet" checked readOnly />
      <img src={wallet} alt="Wallet" style={{ width: "60px", borderRadius: "8px" }} />
      <span style={{ fontWeight: "bold", fontSize: "15px" }}>Pay using Wallet</span>
    </label>
    <p style={{ marginTop: "10px", color: "#555", fontSize: "14px" }}>
      Use your wallet balance or linked credit wallet to complete the purchase.
    </p>
    <button className="action-button" onClick={() => requestMethodChange("cod")}>
      Continue with Wallet
    </button>
  </div>
)}

{selectedMethod === "emi" && (
  <div className="emi-options">
    <h5 style={{ marginBottom: "10px", color: "#555" }}>Choose your EMI Plan</h5>
    {generateEmiOptions(totalAmount + platformFee).map((option) => (
      <label key={option.months} style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="radio"
          name="emi"
          value={option.months}
          checked={selectedEmi === option.months.toString()}
          onChange={() => setSelectedEmi(option.months.toString())}
        />
        {` ${option.months} Months @ $${option.monthlyAmount}/month (Total: $${option.totalPayable})`}
      </label>
    ))}

    <button
      className="action-button"
      style={{ marginTop: "15px" }}
      disabled={!selectedEmi}
      onClick={() => requestMethodChange("emi")} 
    >
      Proceed with EMI
    </button>
  </div>
)}

{selectedMethod === "net" && (
  <div className="netbanking-options">
    <h5 style={{ marginBottom: "10px", color: "#555" }}>Choose your Bank</h5>
    <select
      value={selectedBank}
      onChange={(e) => setSelectedBank(e.target.value)}
      style={{ padding: "10px", width: "100%", maxWidth: "300px", borderRadius: "5px", marginBottom: "15px" }}
    >
      <option value="">Select Bank</option>
      <option value="SBI">State Bank of India (SBI)</option>
      <option value="HDFC">HDFC Bank</option>
      <option value="ICICI">ICICI Bank</option>
      <option value="AXIS">Axis Bank</option>
      <option value="Kotak">Kotak Mahindra Bank</option>
      <option value="PNB">Punjab National Bank</option>
      <option value="BOB">Bank of Baroda</option>
      <option value="Other">Other Banks</option>
    </select>

    <button
      className="action-button"
      disabled={!selectedBank}
      onClick={() => requestMethodChange("net")} 
    >
      Continue with {selectedBank}
    </button>
  </div>
)}


          {(selectedMethod === "cod" && codOption) && (
            <button className="action-button" onClick={() => requestMethodChange("cod")}>
              Place Order
            </button>
          )}

          {(selectedMethod === "upi" && upiOption === "enter") && (
            <>
            <button className="action-button" onClick={() => {if (!upiId.trim()) {
              setUpiIdError("Please enter UPI ID");
              return;
            } 
              setUpiIdError("");
            requestMethodChange("cod");
          }}>
              Pay Now
            </button> 
            </>
          )}
        </div>
      )} 

      <div className="summary-section-pay">
        <h4>PRICE DETAILS ({buyNowItems.length} Items)</h4>
        <div className="summary-line-pay">
          <span>Total MRP</span>
          <span>${totalMRP.toFixed(2)}</span>
        </div>
        <div className="summary-line-pay">
          <span>Discount on MRP</span>
          <span className="green-pay">- ${totalDiscount}</span>
        </div>
        <div className="summary-line-pay">
          <span>Coupon Discount</span>
          <span className="pink-pay">Apply Coupon</span>
        </div>
        <div className="summary-line-pay">
          <span>Platform Fee</span>
          <span>${platformFee}</span>
        </div>
        <div className="summary-line-pay">
          <span>Shipping Fee</span>
          <span className="green-pay">FREE</span>
        </div>
        <hr />
        <div className="summary-line total-pay">
          <strong>Total Amount</strong>
          <strong>${(totalAmount + platformFee).toFixed(0)}</strong>
        </div>
      </div>
    </div>
    {/* <CheckoutFooter /> */}
    </div>
  );
};

export default PaymentPage;