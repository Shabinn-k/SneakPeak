import React from 'react'
import "./Shop.css";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {products} from "../../../db.json"
import { api } from '../../api/Axios';


const Shop = () => {
    const navigate=useNavigate();
    const [search,setSearch]=useState("");
    const [filter,setFilter]=useState(products);

    useEffect(()=>{
        const filtered = products.filter(products=>
            products.title.toLowerCase().includes(search.toLowerCase())
        )
        setFilter(filtered)
    },[search])
  return (
    <div className='shop'>
        <h2 onClick={()=>navigate("/")}>Back to Home</h2>
        <input type="search" placeholder='search something' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </div>
  )
}

export default Shop