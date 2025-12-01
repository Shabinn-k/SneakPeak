import React from 'react'
import image from '../assets/Image'
import { Link } from 'react-router-dom'
import "./Footer.css";

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={image.logo} width={100} className='logg'/>
                    <p>Sootika is a celebration of timeless elegance,
                        bringing together the rich traditions of women’s
                        ethnic fashion with modern style and comfort.
                        At Sootika,<b>we believe every woman deserves to
                        feel graceful and confident</b>, which is why we
                        curate a handpicked collection of sarees, kurtis,
                        lehengas, and traditional wear crafted with exceptional
                        detail. Whether you’re embracing tradition or exploring new
                        styles, Sootika is here to make your fashion journey
                        meaningful, effortless, and uniquely yours.</p>

                    <div className="footer-social-icons">
                        <a href="https://www.instagram.com/"><img src={image.instagram} alt="instagram" width={25} /></a>
                        <a href="https://www.facebook.com/">  <img src={image.facebook} alt="facebook" width={25} /></a>
                        <a href="https://www.linkedin.com/"><img src={image.linked} alt="linked in" width={23} /></a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>

                        <Link to="/"><li>Home</li></Link>
                        <Link to="/about"><li>ABOUT</li></Link>
                        <li>HELP</li>
                        <li>PRIVACY POLICY</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h3>GET In TOUCH</h3>
                    <ul><li>+91 9995977246</li></ul>
                    <li>sootika000@gmail.com</li>
                </div>
            </div>
            <hr />
            <p className='footer-copy'>© 2025 Sootika. All rights reserved.</p>

        </div>
    )
}

export default Footer