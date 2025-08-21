import React from "react";
import { useNavigate } from "react-router-dom";
import "./bookingconfirmed.css";

const BookingConfirmed = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="booking-confirmed-container">
      <div className="booking-card">
        <h1>🎉 Booking Confirmed!</h1>
        <p>Your order has been successfully placed.</p>
        <p>You will receive a confirmation message shortly.</p>
        <button className="home-button" onClick={handleBackToHome}>Go to Shopping</button>
      </div>
    </div>
  );
};

export default BookingConfirmed;
