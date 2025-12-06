import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { api } from '../api/Axios';
import { useAuth } from '../Authentication/AuthContext';
import { toast } from 'react-toastify';

export const CartContext = createContext(null);

const CartContextProvider=(props)=>{
    const {user,openLogin}=useAuth();

        const [cartItems,setCartItems]=useState([]);
        const [wishItems,setWishItems]=useState([])

        //loading cart & wishlist from db when app start
        useEffect(()=>{
            if(!user) return;

            api.get("/cart")
            .then(res=>setCartItems(res.data))
            .catch(err=>console.log(err))
        },[user])

        useEffect(()=>{
            if(!user) return;

            api.get("/wishlist")
            .then(res=>setWishItems(res.data))
            .catch(err=>console.log(err));
        },[user])


        const addToCart=async (item)=>{
            if(!user){
                openLogin();
                toast.warn("Please login to add items to cart !")
                return;
            }

            const exist = cartItems.find(p=>p.id === item.id);
            if(exist){
               const newQty= exist.quantity+(item.quantity || 1);
                   
               if(newQty<=0){
                setCartItems(prev=>prev.filter(c=>c.id !== item.id))
                await api.delete(`/cart/${item.id}`)
                toast.info("Item removed from cart !")
                return;
                    }
                    const updated=cartItems.map(
                        p=>p.id===item.id ? {...p,quantity:newQty} : p 
                    )
                    setCartItems(updated);
                    await api.patch(`/cart/${item.id}`,{quantity:newQty});
                    toast.success("one more!")
                    return;
                 }
//adding new to cart
        const newCart={...item,quantity:1}
        setCartItems(prev=>[...prev,newCart]);
        await api.post("/cart",newCart);

        toast.success("Item added to cart !")
    };
//remove cart
        const removeCart=async(id)=>{
            await api.delete(`/cart/${id}`)
            setCartItems(prev=>prev.filter(item=>item.id !== id))
          toast.info("Item removed from cart !")
        };

//wishlist
        const addToWish=async (item)=>{
            if(!user) {
                openLogin();
                toast.warn("Please login to add items")
                return;
            }

            const exist = wishItems.find(w=>w.id===item.id);
            if(exist){
            toast.info("Already in wishhlist !")
                return;
            }

            setWishItems(prev=>[...prev,item]);
            await api.post("/wishlist",item)
        toast.success("Added to Wishlist !");
        }
        
        const removeWish = async(id)=>{
            await api.delete(`/wishlist/${id}`)
            setWishItems(prev=>prev.filter(item=>item.id !== id))   
            toast.info("Removed from Wishlist")
        }

    const contextValue={
            cartItems,
            addToCart,
            removeCart,
            wishItems,
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

