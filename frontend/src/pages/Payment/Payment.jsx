import React, { useContext, useState } from "react";
import "./Payment.css";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { FaCreditCard, FaGooglePay } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";
import { api } from "../../api/Axios";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, setUser } = useAuth();

  const buyNowItem = state?.product
    ? [{ ...state.product, quantity: state.quant || 1 }]
    : cartItems || [];

  const [paymentMethod, setPaymentMethod] = useState("");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "" });
  const [loading, setLoading] = useState(false);

  // total
  const subTotal = buyNowItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 80;
  const total = subTotal + shipping;

  const handleCompletePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method!");
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      toast.success("Payment Successful! Order Placed.");

      navigate("/myOrders");
      //new order
      const newOrder = {
        orderId: (user.orders?.length || 0) + 1,
        date: new Date().toLocaleDateString(),
        track: "Pending",
        items: buyNowItem,
        total: total,
      };

      //combining old with new
      const updatedOrders = [...(user.orders || []), newOrder];

      await api.patch(`/users/${user.id}`, {
        orders: updatedOrders,
      });

      //update auth user 
      const updatedUser = { ...user, orders: updatedOrders, };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      //clear cart if buy from cart
      if (!state?.product) {
        await clearCart();
      }
    }, 1000);
  };

  return (
    <div className="payment-page">
      <div className="payment-box">
        {/* ordr summry */}
        <div className="summry">
          <h2>Order Summary</h2>

          {buyNowItem.map((item) => (
            <div className="summary-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div>
                <h4>{item.title}</h4>
                <p>Qty: {item.quantity}</p>
                <p>₹ {item.price} × {item.quantity}</p>
              </div>

              <span className="summary-price">₹ {item.price * item.quantity}</span>
            </div>
          ))}

          <div className="summary-total">
            <p>Subtotal: <span>₹ {subTotal}</span></p>
            <p>Shipping: <span>₹ {shipping}</span></p>
            <h3>Total: <span>₹ {total}</span></h3>
          </div>
        </div>

        <div className="payment-section">
          <h2>Select Payment Method</h2>

          <div className="payment-options">

            <div className={`pay-option ${paymentMethod === "upi" ? "active" : ""}`}
              onClick={() => setPaymentMethod("upi")}>
              <FaGooglePay size={28} />
              <span>Google Pay / UPI</span>
            </div>

            <div className={`pay-option ${paymentMethod === "card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("card")} >
              <FaCreditCard size={24} />
              <span>Debit / Credit Card</span>
            </div>

            <div className={`pay-option ${paymentMethod === "cod" ? "active" : ""}`}
              onClick={() => setPaymentMethod("cod")}>
              <span className="cod-icon">💵</span>
              <span>Cash on Delivery</span>
            </div>

          </div>

          {paymentMethod === "upi" && (
            <div className="upi-box">
              <h4>Enter UPI ID</h4>
              <input type="text" placeholder="yourname@upi" value={upi}
                onChange={(e) => setUpi(e.target.value)} />
            </div>
          )}


          {paymentMethod === "card" && (
            <div className="card-box">
              <h4>Card Details</h4>

              <input type="text" placeholder="Card Number" value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })} />

              <input type="text" placeholder="Cardholder Name" value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })} />

              <input type="text" placeholder="MM/YY" value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
            </div>
          )}

          {paymentMethod === "cod" && (
            <div className="cod-box">
              <p>Pay when your order arrives. COD charges ₹20 apply.</p>
            </div>
          )}

          <button className={`pay-btn ${loading ? "loading" : ""}`}
            onClick={handleCompletePayment}>
            {loading ? "paying..." : `Pay ₹ ${total}`}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Payment;
