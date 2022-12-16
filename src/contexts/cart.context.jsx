import { useState, createContext } from "react";

export const CartContext = createContext({
  display: false,
});

export const CartProvider = ({ children }) => {
  const [display, setDisplay] = useState(false);
  const value = { display, setDisplay };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
