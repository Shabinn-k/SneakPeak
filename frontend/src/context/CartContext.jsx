import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { api } from "../api/Axios";
import { useAuth } from "../Authentication/AuthContext";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

const CartContextProvider = (props) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);

// Load cart, wishlist from logged user
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setWishItems([]);
      return;
    }

    api
      .get(`/users/${user.id}`)
      .then((res) => {
        setCartItems(res.data.cart || []);
        setWishItems(res.data.wishlist || []);
      })
      .catch((err) => console.log(err));
  }, [user]);

// Update user in DB
  const updateUserData = async (data) => {
    await api.patch(`/users/${user.id}`, data);
  };

// cart
  const addToCart = async (item) => {
    if (!user) {
      toast.warn("Please login to add items to cart!");
      return;
    }

    const exist = cartItems.find((p) => p.id === item.id);

// Item exists update quantity
    if (exist) {
      const updatedQty = exist.quantity + (item.quantity || 1);

      if (updatedQty <= 0) {
        const updated = cartItems.filter((c) => c.id !== item.id);
        setCartItems(updated);
        await updateUserData({ cart: updated });
        toast.info("Item removed from cart");
        return;
      }

      const updated = cartItems.map((p) =>
        p.id === item.id ? { ...p, quantity: updatedQty } : p
      );

      setCartItems(updated);
      await updateUserData({ cart: updated });
      toast.success("Increased quantity!");
      return;
    }

// New item
    const newItem = { ...item, quantity: 1 };
    const updated = [...cartItems, newItem];

    setCartItems(updated);
    await updateUserData({ cart: updated });

    toast.success("Item added to cart!");
  };

  const removeCart = async (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    await updateUserData({ cart: updated });
    toast.info("Item removed from cart!");
  };

  const clearCart = async () => {
  setCartItems([]);  
  await updateUserData({ cart: [] });  // <-- updates DB for that user
};

  //WISHLIST 
  const addToWish = async (item) => {
    if (!user) {
      toast.warn("Please login to add items");
      return;
    }

    const exist = wishItems.find((w) => w.id === item.id);
    if (exist) {
      toast.info("Already in wishlist!");
      return;
    }

    const updated = [...wishItems, item];
    setWishItems(updated);
    await updateUserData({ wishlist: updated });

    toast.success("Added to wishlist!");
  };

  const removeWish = async (id) => {
    const updated = wishItems.filter((item) => item.id !== id);
    setWishItems(updated);
    await updateUserData({ wishlist: updated });

    toast.info("Removed from wishlist");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeCart,
        clearCart,
        wishItems,
        addToWish,
        removeWish,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
