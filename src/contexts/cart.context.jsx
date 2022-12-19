import { useState, createContext, useEffect } from "react";

const addCardItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  display: false,
  setDisplay: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  total: 0,
  setTotal: () => {},
});

export const CartProvider = ({ children }) => {
  const [display, setDisplay] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);

    const newTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCardItem(cartItems, productToAdd));
  };

  const value = {
    display,
    setDisplay,
    addItemToCart,
    setCartItems,
    cartItems,
    cartCount,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
