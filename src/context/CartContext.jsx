import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size) => {
    const existingItem = cart.find(
      item => item.id === product.id && item.size === size
    );
    if (existingItem) {
      setCart(prev =>
        prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart(prev => [...prev, { ...product, size, quantity: 1 }]);
    }
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const editCartItem = (id, size) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, size: size } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, editCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
