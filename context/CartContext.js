"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("novel_cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
        localStorage.removeItem("novel_cart");
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("novel_cart", JSON.stringify(cart));
  }, [cart]);

  // Add book
  const addToCart = (book) => {
    setCart((previousCart) => {
      const existingBook = previousCart.find(
        (item) => item._id === book._id
      );

      if (existingBook) {
        return previousCart.map((item) =>
          item._id === book._id
            ? {
                ...item,
                quantity: Number(item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...book,
          quantity: 1,
        },
      ];
    });
  };

  // Remove book completely
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item._id !== id)
    );
  };

  // PLUS / MINUS quantity
  const updateQuantity = (id, quantity) => {
    const newQuantity = Number(quantity);

    if (newQuantity <= 0) {
      setCart((previousCart) =>
        previousCart.filter((item) => item._id !== id)
      );

      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);