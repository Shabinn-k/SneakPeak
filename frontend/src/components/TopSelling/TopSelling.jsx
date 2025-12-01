import React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../api/Axios';
import "./TopSelling.css"

const TopSelling = () => {
    const [prod, setProd] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then(res => setProd(res.data))
            .catch((err) => console.log(err))
    }, [])
    console.log(prod);


    return (
        <div>
            <h1>Our Top Selling Products :-</h1>
            <br />
            <div className="group-1">
                {prod.slice(0, 4)
                    .map((item) => (
                        <div key={item.id}>
                            <img src={item.image} alt={item.title} width={150} />
                            <h3>{item.title}</h3>
                            <p>{item.catogory}</p>
                            <span>{item.price}</span>
                        </div>
                    ))}
            </div>

            <div className="group-2">
                {prod.slice(4, 8)
                    .map((item) => (
                        <div key={item.id}>
                            <img src={item.image} alt={item.title} width={150} />
                            <h3>{item.title}</h3>
                            <h2>{item.name}</h2>
                            <p>{item.catogory}</p>
                            <span>{item.price}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
}


export default TopSelling