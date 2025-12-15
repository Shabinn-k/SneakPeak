import React, { useState } from "react";
import { toast } from "react-toastify";
import "./WriteFeed.css";
import { api } from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

const WriteFeed = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !review) {
      toast.error("All fields are required!");
      return;
    }

    //   ALWAYS pending first
    const feedback = {
      name: user?.name || "",
      rating,
      review,
      feed: "pending"   
    };

    try {
      await api.post("/feedbacks", feedback);
      toast.success("Feedback sent for admin approval!");
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="writefeed-container">
      <form onSubmit={handleSubmit} className="writefeed-form">
        <h2>Write a Review</h2>

        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your feedback..."
          value={review}
          onChange={(e) => setreview(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WriteFeed;
