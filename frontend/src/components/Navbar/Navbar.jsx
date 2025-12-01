import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.css";
import image from '../../assets/Image';


const Navbar = () => {

    return (
        <div className='navbar'>
            <img src={image.logo} className="title"/>

            <div className="links">
                <Link to="/" className='link-items'>Home</Link>
                <Link to="/shop" className='link-items'>Shop</Link>
                <Link to="/brands" className='link-items'>Brands</Link>
                <Link to="/catogories" className='link-items'>Catogory</Link>
            </div>

            <div className="fnction">
                <Link to="/wishlist">wishlist</Link>
                <Link to="/cart">cart</Link>
                <Link to="/login"><button>Sign - in</button></Link>
            </div>

        </div>
    )
}

export default Navbar