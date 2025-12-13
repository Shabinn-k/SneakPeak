import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { api } from "../../../api/Axios";
import "./Dashboard.css";

const Dashboard = () => {
// STATES
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

// LOAD DATA FROM JSON-SERVER
  const loadDashboardData = async () => {
    const productRes = await api.get("/products");
    const userRes = await api.get("/users");

    setProducts(productRes.data);
    setUsers(userRes.data);

// Collect all orders & feedbacks from users
    let allOrders = [];
    let allFeedback = [];

    userRes.data.forEach((user) => {
      if (user.orders) allOrders = [...allOrders, ...user.orders];
      if (user.feedback) allFeedback = [...allFeedback, ...user.feedback];
    });

    setOrders(allOrders);
    setFeedbacks(allFeedback);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

// COUNTS 
  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;

// CALCULATE TOTAL REVENUE 
  let totalRev = 0;

  orders.forEach((order) => {
// Case 1: Order has a "total" field
    if (order.total) {
      totalRev += order.total;
    }

// Case 2: Order has items array → calculate total
    if (order.items) {
      order.items.forEach((item) => {
        totalRev += item.price * (item.qty || 1);
      });
    }
  });

  const pendingOrders = orders.filter((o) => o.status !== "Delivered").length;
  const pendingFeedback = feedbacks.filter((f) => f.status === "pending").length;

// UI 
  return (
    <Layout>
      <div className="dashboard-container">

        <h1 className="dash-title">Dashboard Overview</h1>

{/* TOP CARDS */}
        <div className="dash-cards">
          
          <div className="dash-card">
            <h2>{totalProducts}</h2>
            <p>Total Products</p>
          </div>

          <div className="dash-card">
            <h2>{totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="dash-card">
            <h2>{totalOrders}</h2>
            <p>Total Orders</p>
          </div>

          <div className="dash-card">
            <h2>₹{totalRev.toLocaleString()}</h2>
            <p>Total Revenue</p>
          </div>

          <div className="dash-card warning">
            <h2>{pendingOrders}</h2>
            <p>Pending Orders</p>
          </div>

          <div className="dash-card warning">
            <h2>{pendingFeedback}</h2>
            <p>Pending Feedback</p>
          </div>

        </div>

{/* RECENT ORDERS */}
        <h2 className="recent-title">Recent Orders</h2>

        <div className="recent-orders">
          {orders.slice(0, 5).map((order, index) => (
            <div className="recent-item" key={index}>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
