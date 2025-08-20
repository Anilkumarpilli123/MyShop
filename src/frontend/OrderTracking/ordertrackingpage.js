import React, { useEffect, useState } from "react";
import "./ordertrackingpage.css";
import toptruck from "../assets/toptruck.jpg";

const OrderTrackingPage = () => {
  const [groupedOrders, setGroupedOrders] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    const grouped = {};

    stored.forEach(order => {
      const orderedDate = new Date(order.orderedAt || Date.now());
      const deliveryDate = new Date(orderedDate);
      deliveryDate.setDate(orderedDate.getDate() + 2);

      const key = orderedDate.toDateString();
      if (!grouped[key]) grouped[key] = [];

      grouped[key].push({
        ...order,
        deliveryDate: deliveryDate.toDateString(),
        status: new Date() > deliveryDate ? "Delivered" : "In Transit"
      });
    });

    setGroupedOrders(grouped);
  }, []);

  return (
    <div className="tracking-container">
      <h2>Order Tracking</h2>
      {Object.keys(groupedOrders).length === 0 ? (
        <p>No orders to track.</p>
      ) : (
        Object.keys(groupedOrders).map(date => (
          <div key={date}>
            {/* <h3 className="order-date-title">Ordered on: {date}</h3> */}
            {groupedOrders[date].map((item, idx) => (
              <div className="tracking-card" key={idx}>
                <img src={toptruck} alt="order" className="truck-image" />
                <div className="tracking-details"> 
                  <h4>{item.name}</h4>
                    <p>Ordered on: {date}</p>
                  {/* <p>Qty: {item.qty || 1}</p> */}
                  <p>Expected Delivery: {item.deliveryDate}</p>
                  <div className="status-bar">
  <div className="progress-line">
    <div className="progress-fill" style={{ width: "30%" }}></div> {/* 50% = up to "Order Shipped" */}
  </div>

  <div className="status-steps">
    <div className="step active1">
      <span className="step-icon">✓</span>
      <span className="step-label">Order Confirmed</span>
    </div>
    <div className="step active2">
      <span className="step-icon">📦</span>
      <span className="step-label">Order Shipped</span>
    </div>
    <div className="step active3">
      <span className="step-icon">🚚</span>
      <span className="step-label">Out for Delivery</span>
    </div>
    <div className="step active4">
      <span className="step-icon">🏠</span>
      <span className="step-label">Order Delivered</span>
    </div>
  </div>
</div>

                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderTrackingPage;
