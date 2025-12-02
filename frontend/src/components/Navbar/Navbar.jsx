import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import image from "../../assets/Image";

const Navbar = () => {
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
          <Link to="/wishlist"><img src={image.wish} alt="wishlist" width={25} /></Link>
          <Link to="/cart"><img src={image.cart} alt="cart" width={25} /></Link>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
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
          <Link to="/" className="link-items" onClick={() => setOpenMenu(false)}>Home</Link>
          <Link to="/shop" className="link-items" onClick={() => setOpenMenu(false)}>Shop</Link>
          <Link to="/brands" className="link-items" onClick={() => setOpenMenu(false)}>Brands</Link>
          <Link to="/catogories" className="link-items" onClick={() => setOpenMenu(false)}>Category</Link>

          <hr />

          <Link to="/wishlist" onClick={() => setOpenMenu(false)}>Wishlist</Link>
          <Link to="/cart" onClick={() => setOpenMenu(false)}>Cart</Link>
          <Link to="/login" onClick={() => setOpenMenu(false)}>Sign In</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
