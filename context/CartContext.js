'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from LocalStorage on first load
  useEffect(() => {
    const savedCart = localStorage.getItem('novel_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('novel_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (novel) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === novel._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === novel._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...novel, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);