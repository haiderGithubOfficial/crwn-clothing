import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

// Helper functions starts: addCardItem, cartItemToRemove, listItemToRemove these functions are adding and removing the cart items

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

/* ----------------------------------------------- */

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

/* ----------------------------------------------- */

const listItemToRemove = (cartItems, listItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === listItemToRemove.id
  );

  if (existingCartItem.quantity) {
    return cartItems.filter((cartItem) => cartItem.id !== listItemToRemove.id);
  }
};
/* ----------------------------------------------- */
// Helper functions Ends here.

// cart reducer starts here

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  CART_DROPDOWN: "CART_DROPDOWN",
};

/* ----------------------------------------------- */

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
        // cartItems: payload.cartItems,
        // cartCount: payload.cartCount,
        // cartTotal: payload.cartTotal, /// we use ...payload instead of these three lines
      };
    case CART_ACTION_TYPES.CART_DROPDOWN:
      return {
        ...state,
        display: payload.display,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

/* ----------------------------------------------- */

const INITIAL_STATE = {
  display: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

/* ----------------------------------------------- */

// cart reducer ends  here

// cart context starts here
/* ----------------------------------------------- */
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
/* ----------------------------------------------- */
export const CartProvider = ({ children }) => {
  const [{ display, cartCount, cartTotal, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0 // 0 is a reducer function initializer
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem?.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCardItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (productToRemove) => {
    const newCartItems = cartItemToRemove(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const removeListItemToCart = (itemToRemove) => {
    const newCartItems = listItemToRemove(cartItems, itemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const setDisplay = (display) => {
    dispatch(createAction(CART_ACTION_TYPES.CART_DROPDOWN, { display }));
  };

  /* ----------------------------------------------- */

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
// cart context ends here
