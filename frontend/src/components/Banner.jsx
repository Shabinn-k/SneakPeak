import React, { useEffect, useState } from 'react'
import ban1 from "./../assets/ban1.jpg"
import ban2 from "./../assets/ban2.jpg";
import ban3 from "./../assets/ban3.jpg";
import ban4 from "./../assets/ban4.png";
import "./Banner.css";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const bannerImages = [ban1, ban2, ban3, ban4];

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