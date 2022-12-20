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

const cartItemToRemove = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const listItemToRemove = (cartItems, listItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === listItemToRemove.id
  );

  if (existingCartItem.quantity) {
    return cartItems.filter((cartItem) => cartItem.id !== listItemToRemove.id);
  }
};

export const CartContext = createContext({
  display: false,
  setDisplay: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  removeCartItem: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [display, setDisplay] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCardItem(cartItems, productToAdd));
  };

  const removeItemToCart = (productToRemove) => {
    setCartItems(cartItemToRemove(cartItems, productToRemove));
  };

  const removeListItemToCart = (itemToRemove) => {
    setCartItems(listItemToRemove(cartItems, itemToRemove));
  };

  const value = {
    display,
    setDisplay,
    addItemToCart,
    removeItemToCart,
    removeListItemToCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
