import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import image from "../../assets/Image";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../Authentication/AuthContext";

const Navbar = ({setShowLogin}) => {
  const {user,logout} =useAuth();
  const {cartItems,wishItems}=useContext(CartContext);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className="navbar">

        <img src={image.logo} className="title" alt="logo" />

        <div className="links">
          <Link to="/" className="link-items">Home</Link>
          <Link to="/shop" className="link-items">Shop</Link>
          <Link to="/brands" className="link-items">Brands</Link>
          <Link to="/catogories" className="link-items">Category</Link>
        </div>

        <div className="fnction">
          <Link to="/wishlist" className="navbar-search-icon"><img src={image.hrt} alt="wishlist" width={25} />{wishItems.length > 0 && (<div className="dot">{wishItems.length}</div>)}</Link>
          <Link to="/cart" className="navbar-search-icon"><img src={image.cart} alt="cart" width={25} />{cartItems.length > 0 &&(<div className="dot">{cartItems.length}</div>)}</Link>
          {user?(<div className="user-box"><span className="username">Hy, {user.name}</span><button className="logout-btn" onClick={logout}>Logout</button></div>):
          (

            <button className="rounded-2xl p-3 w-17 h-7 hover:bg-amber-200" onClick={()=>setShowLogin(true)}>Sign In</button>
          )}
         
        </div>

        <div
          className="mobile-menu-btn"
          onClick={() => setOpenMenu(!openMenu)}
        >
          ☰
        </div>
      </div>

       {openMenu && (
        <div className="mobile-links">
          <Link to="/" onClick={() => setOpenMenu(false)}>Home</Link>
          <Link to="/shop" onClick={() => setOpenMenu(false)}>Shop</Link>
          <Link to="/brands" onClick={() => setOpenMenu(false)}>Brands</Link>
          <Link to="/catogories" onClick={() => setOpenMenu(false)}>Category</Link>
          <hr />
          <Link to="/wishlist" onClick={() => setOpenMenu(false)}>Wishlist</Link>
          <Link to="/cart" onClick={() => setOpenMenu(false)}>Cart</Link>

          {user ? (
            <button onClick={() => { logout(); setOpenMenu(false); }} className="logout-btn">Logout</button>
          ) : (
            <button onClick={() => {setShowLogin(true);setOpenMenu(false)}} className="login-btn">Sign In</button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
