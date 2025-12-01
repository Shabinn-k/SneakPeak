import React, { useEffect, useState } from 'react'
import img1 from "./../assets/banner1.jpg"
import img2 from "./../assets/banner2.jpg";
import img3 from "./../assets/banner3.jpg";
import img4 from "./../assets/banner4.jpg";
import "./Banner.css";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const bannerImages = [img1, img2, img3, img4];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % bannerImages.length);
        }, 2500);
        return () => clearInterval(interval)
    }, [bannerImages.length])

    return (
        <div className='banner'>
            <div className="bannerContainer">
                {bannerImages
                    .map((item,index) => (
                        <div key={index}
                            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}>
                            <img src={item} /></div>
                    ))}
            </div>
        </div>
    )
}

export default Banner