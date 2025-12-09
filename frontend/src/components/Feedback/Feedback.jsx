import React, { useEffect, useState } from "react";
import "./Feedback.css";
import { api } from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";


const Feedback = ({setShowLogin}) => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
    const {user} =useAuth();
  // Load feedback data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/feedbacks");
        setFeedbacks(res.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

     const handleFeed = () => {
            if (!user) {
                setShowLogin(true);
                toast.warn("Please login to add review !");
                return false;
            }
            return true;
        };  

  // Calculate average rating
  const averageRating =
    feedbacks.length > 0
      ? (feedbacks.reduce((total, item) => total + item.rating, 0) / feedbacks.length).toFixed(1)
      : 0;

  return (
    <div className="feedback-container">

      <h2>Customer Reviews</h2>
      <p>What our customers say about our products</p>

      {/* List of Feedbacks */}
      <div className="feedback-cards">
        {feedbacks.map((item) => (
          <div key={item.id} className="feedback-card">

            <div className="user-info">
              <div className="user-avatar">{item.name[0]}</div>
              <div>
                <h4>{item.name}</h4>
                </div>
            </div>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= item.rating ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">{item.rating}.0</span>
            </div>

            <p className="feedback-comment">"{item.comment}"</p>
          </div>
        ))}
      </div>

      <div className="average-rating">
        <div className="rating-circle">
          <span className="rating-number">{averageRating}</span>
          <span className="rating-out-of">/5</span>
        </div>

        <div className="rating-info">
          <h3>Overall Rating</h3>
          <p>Based on {feedbacks.length} reviews</p>
        </div>
      </div>

      <button className="write-review-btn" onClick={() =>{handleFeed(); navigate("/feedback")}}>
        Write a Review
      </button>

    </div>
  );
};

export default Feedback;
