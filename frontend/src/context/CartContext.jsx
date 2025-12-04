import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { api } from '../api/Axios';

export const CartContext = createContext(null);

const CartContextProvider=(props)=>{
        const [cartItems,setCartItems]=useState([]);
        const [wishItems,setWishItems]=useState([])

        //loading cart & wishlist from db when app start
        useEffect(()=>{
            api.get("/cart")
            .then(res=>setCartItems(res.data))
            .catch(err=>console.log(err))
        },[])

        useEffect(()=>{
            api.get("/wishlist")
            .then(res=>setWishItems(res.data))
            .catch(err=>console.log(err));
        },[])

        const addToCart=async (item)=>{
            const exist = cartItems.find(p=>p.id === item.id);
            if(exist){
               const newQty= exist.quantity+(item.quantity || 1);
                    if(newQty<=0){
                        removeCart(item.    id)
                setCartItems(prev=>prev.filter(item=>item.id !== id))
                return;
                    }
                    const updated=cartItems.map(
                        p=>p.id===item.id ? {...p,quantity:newQty} : p 
                    )
                    setCartItems(updated);
                    await api.patch(`/cart/${item.id}`,{quantity:newQty});
           return; }

        const newCart={...item,quantity:1}
        setCartItems(prev=>[...prev,newCart]);
        await api.post("/cart",newCart);
    };

        const removeCart=async(id)=>{
            try {
                await api.delete(`/cart/${id}`)
                setCartItems(prev=>prev.filter(item=>item.id !== id))
            } catch (err) {
                console.log(err);
            }
        };

        const addToWish=async (item)=>{
            const exist = wishItems.find(w=>w.id===item.id);
            if(exist){
                return;
            }

            setWishItems(prev=>[...prev,item]);
            await api.post("/wishlist",item)
        }
        
        const removeWish = async(id)=>{
            try {
                await api.delete(`/wishlist/${id}`)
                 setWishItems(prev=>prev.filter(item=>item.id !== id))   
            } catch (err) {
                console.log(err);
            }
        }

    const contextValue={
            cartItems,
            setCartItems,
            addToCart,
            removeCart,
            wishItems,
            setWishItems,
            addToWish,
            removeWish,
    }

    return(
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartContextProvider

