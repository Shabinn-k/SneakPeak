import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { api } from "../../../api/Axios";
import "./AdminOrders.css";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // 1️⃣ Read-only fetch
  const fetchOrders = async () => {
    const res = await api.get("/users");
    let list = [];

    res.data.forEach((user) => {
      if (Array.isArray(user.orders)) {
        user.orders.forEach((order) => {
          list.push({
            userId: user.id,
            userName: user.name,
            orderId: order.orderId,
            date: order.date,
            track: order.track,
            items: order.items,
            total:order.total
          });
        });
      }
    });

    setOrders(list);
  };

  // 2️⃣ Update order status OR payment
  const updateOrder = async (userId, orderId, newTrack) => {

    const res = await api.get(`/users/${userId}`);
    const user = res.data;

    const updatedOrders = user.orders.map(order =>
      order.orderId === orderId
        ? { ...order, track: newTrack }   // ✅ track here
        : order
    );

    await api.patch(`/users/${userId}`, {
      orders: updatedOrders
    });

    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId
          ? { ...order, track: newTrack }
          : order
      )
    );
  };


  return (
    <Layout>
      <div className="admin-orders">
        <h2>Admin Orders</h2>

        {orders.map((order, index) => (
          <div className="order-card" key={index}>

            <p><b>User:</b> {order.userName}</p>
            <p><b>Order ID:</b> {order.orderId}</p>
            <p><b>Date:</b> {order.date}</p>
            <h3 className="ppp">Total : ₹ {order.total}</h3>
            {/* STATUS */}
            <label>Status:</label>
            <select
              value={order.track}
              onChange={(e) =>
                updateOrder(order.userId, order.orderId, e.target.value)
              }
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <h4>Items</h4>
            {order.items.map(item => (
              <p key={item.id}>
                {item.title} × {item.quantity} — ₹ {item.price}
              </p>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminOrders;
