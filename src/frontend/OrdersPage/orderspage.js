import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import "./orderspage.css";

const OrdersPage = () => {
    const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [confirmIndex, setConfirmIndex] = useState(false);

    useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);
  
  const handleCancelOrder = (orderIndex) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(orderIndex, 1);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };
  
  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <h4>Order #{index + 1}</h4>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <p>Qty: {item.qty}</p>
                      <p>Price: {item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="total">Total: ${order.total}</p>
              <p className="order-date">Ordered on: {order.date}</p>
              <button className="cancel-order-btn" onClick={() => setConfirmIndex(index)}>Cancel Order</button>

               {confirmIndex === index && (
      <div className="inline-confirm-box">
        <p>Are you sure you want to cancel this order?</p>
        <button
          className="yes-btn"
          onClick={() => {
            handleCancelOrder(index);
            setConfirmIndex(null);
          }}
        >
          Yes
        </button>
        <button
          className="no-btn"
          onClick={() => setConfirmIndex(null)}
        >
          No
        </button>
        <button className="track-btn" onClick={() => navigate("/order-tracking")}>
  Track Order
</button>
      </div>
    )}
  </div> 
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
