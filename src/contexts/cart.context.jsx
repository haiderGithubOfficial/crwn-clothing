import { useState, createContext } from "react";

export const CartContext = createContext({
  display: false,
  setDisplay: () => {},
  cartItem: [],
  setCartItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [display, setDisplay] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const value = { display, setDisplay, cartItem, setCartItem };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
