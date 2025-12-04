import React, { useState, useEffect, useContext } from 'react';
import { api } from '../../api/Axios';
import "./TopSelling.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { CartContext } from '../../context/CartContext';

const TopSelling = () => {
    const [prod, setProd] = useState([]);
    const {addToCart,addToWish} = useContext(CartContext);
    useEffect(() => {
        api.get("/products")
            .then(res => setProd(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <br />
            <h1>Our New Collections :-</h1>

            <div className="group-1">
                {prod.slice(0, 4).map((item) => (
                    <div key={item.id} className="card">
                      
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                         <div className="card-icons">
                            <FaHeart className="wish-icon" onClick={()=>addToWish(item)}/>
                            <FaShoppingCart className="cart-icon" onClick={()=>addToCart(item)}/>
                        </div>
                        <h2>{item.name}</h2>
                        <p>{item.catogory}</p>
                        <span>₹ {item.price}</span>
                         
                    </div>
                ))}
            </div>

            <div className="group-2">
                {prod.slice(4, 8).map((item) => (
                    <div key={item.id} className="card">
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                         <div className="card-icons">
                            <FaHeart className="wish-icon" onClick={()=>addToWish(item)}/>
                            <FaShoppingCart className="cart-icon" onClick={()=>addToCart(item)}/>
                        </div>
                        <h2>{item.name}</h2>
                        <p>{item.catogory}</p>
                        <span>₹ {item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopSelling;
