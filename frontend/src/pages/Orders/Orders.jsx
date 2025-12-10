import React, { useEffect, useState } from "react";
import "./Orders.css";
import { api } from "../../api/Axios";
import { useAuth } from "../../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Fetch user's orders from DB
    api.get(`/users/${user.id}`)
      .then((res) => {
        setOrders(res.data.orders || []);
      })
      .catch((err) => console.log(err));
  }, [user]);

  // Order status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "pending";
      case "Shipped": return "shipped";
      case "Out for Delivery": return "out";
      case "Delivered": return "delivered";
      default: return "";
    }
  };

  return (
    <div className="orders-page">
            <button onClick={()=>navigate("/")}>Go Home</button>
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.orderId}>
            
            <div className="order-header">
              <h3><h3>Order {order.orderId}</h3></h3>
              <span className={`order-status ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <p className="order-date">{order.date}</p>

            {order.items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="order-item-info">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>

                <p className="item-total">₹{item.quantity * item.price}</p>
              </div>
            ))}

            <div className="order-footer">
              <h3>Total Paid: ₹{order.total}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
