import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { api } from '../api/Axios';

export const CartContext = createContext(null);

const CartContextProvider=(prop)=>{
        const [cartItems,setCartItems]=useState({});

        //loading cart from db when app start
        useEffect(()=>{
            api.get("/cart")
            .then(res=>setCartItems(res.data))
            .catch(err=>console.log(err))
        },[])

        const addToCart=async (item)=>{
            const exist = cartItems.find(p=>p.id === item.id);
            if(exist) return;
           setCartItems(prev=>[...prev,item]);
           await api.post("/cart",{...item})
        }

        const removeCart=async(id)=>{
            try {
                await api.get(`/cart/${id}`)
                setCartItems(prev=>prev.filter(item=>item.id !== id))
            } catch (err) {
                console.log(err);
            }
        }
        useEffect(()=>{
            console.log(cartItems);
            
        },[cartItems])
    const contextValue={
            cartItems,
            setCartItems,
            addToCart,
            removeCart
    }

    return(
        <CartContext.Provider value={contextValue}>
            {prop.children}
        </CartContext.Provider>
    )
}
export default CartContextProvider