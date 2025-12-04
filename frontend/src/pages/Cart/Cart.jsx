import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeCart } = useContext(CartContext)
  return (
    <div className='cart-page'>
      <div className="cart-header">
        <h1 className='text-center'>YOUR CART ITEMS</h1>
        <button className='home-btn' onClick={() => navigate("/")}>HOME</button>
      </div>
      {cartItems.length === 0 ? (<h2 className='empty-msg'>NO ITEMS WERE ADDED </h2>) :
        (cartItems.map((item) => (
          <div key={item.id} className='cart-card'>
            <img src={item.image} width={150} alt={item.title} />
            <div className="cart-info">
              <h3>{item.title}</h3>
              <h2>{item.name}</h2>
              <p>{item.catogory}</p>
              <span>$ {item.price}</span>
            </div>
            <div className="cart-last">
            <button onClick={()=>addToCart({...item,quantity:-1})}>-</button>
            <h4>{item.quantity}</h4>
            <button onClick={()=>addToCart({...item,quantity:1})}>+</button> </div>
            <button className='remove-btn' onClick={() => removeCart(item.id)}>Remove</button>
           
          </div>
        ))
        )}
    </div>
  )
}

export default Cart