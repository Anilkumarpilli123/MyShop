// SpecialNavbar.js
import React from "react";
import { useLocation } from "react-router-dom";
import './buynownavbar.css';
import { useNavigate } from "react-router-dom";

const BuyNowNavbar = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  }; 
  // Define the steps for checkout process
  const steps = [
    { path: "buynow", label: "B A G" },
    { path: "address", label: "A D D R E S S" },
    { path: "paymentpage", label: "P A Y M E N T" }
  ];


  return (
    <header className="special-navbar">
      <h1 className="logo" onClick={handleHomeClick} style={{cursor: "pointer"}}>MyShop</h1>
      <div className="checkout-progress">
        {steps.map((step, index) => {
          const isActive = pathSegments.includes(step.path);
          const isCompleted = steps.findIndex(s => pathSegments.includes(s.path)) > index;

          return (
            <React.Fragment key={step.path}>
              <div className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                {step.label}
              </div>
              {index < steps.length - 1 && (
                <div className="separator">......</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="secureContainer">
        <img src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png" className="secureIcon" alt="secureimage" width="26" height="28" />
        <div className="secure">100% SECURE</div>
      </div>
    </header>
  );
};

export default BuyNowNavbar;