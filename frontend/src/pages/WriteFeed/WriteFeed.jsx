import React, { useState } from "react";
import { toast } from "react-toastify";
import "./WriteFeed.css";
import { api } from "../../api/Axios";
import { useNavigate } from "react-router-dom";

const WriteFeed = () => {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !rating || !comment) {
            toast.error("All fields are required!");
            return;
        }

        const newFeedback = {
            name,
            rating,
            comment,
            product: "General"
        };

        try {
            await api.post("/feedbacks", newFeedback);
            toast.success("Review submitted!");
            // clear form
            setName("");
            setRating(0);
            setComment("");
        } catch (err) {
            console.log(err);
            toast.error("Failed to submit review");
        }
    };

    return (
        <div className="writefeed-container">

            <div className="writefeed-page">
                <h2>Write a Review</h2>

                <form className="writefeed-form" onSubmit={handleSubmit}>

                    <input type="text" placeholder="Your Name"
                        className="input-box" value={name}
                        onChange={(e) => setName(e.target.value)} />


                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= rating ? "star filled" : "star"}
                                onClick={() => setRating(star)}>★</span>
                        ))}
                    </div>

                    <textarea placeholder="Write your review here..."
                        className="input-box textarea" value={comment}
                        onChange={(e) => setComment(e.target.value)} />

                    <button type="submit" className="submit-btn" onClick={()=>navigate("/")}>
                        Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default WriteFeed;
