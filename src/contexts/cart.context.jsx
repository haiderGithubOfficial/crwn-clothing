import { useState, createContext, useEffect, useReducer } from "react";

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
  SET_DISPLAY: "SET_DISPLAY",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM", // for decresing the product quantity is > 1
  REMOVE_CART_LIST_ITEM: "REMOVE_CART_LIST_ITEM", // removing the entire item from the cart list regardless od quantity
};

/* ----------------------------------------------- */

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_DISPLAY:
      return {
        ...state,
        display: payload.display,
      };
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload.newCartCount,
      };
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: payload.newCartTotal,
      };
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: payload.addCartItems,
      };
    case CART_ACTION_TYPES.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: payload.removeCartItem,
      };
    case CART_ACTION_TYPES.REMOVE_CART_LIST_ITEM:
      return {
        ...state,
        cartItems: payload.removeCartListItem,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

/* ----------------------------------------------- */

const INITIAL_STATE = {
  display: false,
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
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

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0 // 0 is a reducer function initializer
    );

    const setCartCount = (newCartCount) => {
      dispatch({
        type: CART_ACTION_TYPES.SET_CART_COUNT,
        payload: { newCartCount },
      });
    };
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem?.price,
      0
    );
    const setCartTotal = (newCartTotal) => {
      dispatch({
        type: CART_ACTION_TYPES.SET_CART_TOTAL,
        payload: { newCartTotal },
      });
    };
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const setDisplay = (display) => {
    dispatch({ type: CART_ACTION_TYPES.SET_DISPLAY, payload: { display } });
  };

  const addItemToCart = (productToAdd) => {
    const addCartItems = addCardItem(cartItems, productToAdd);
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: { addCartItems: addCartItems },
    });
  };

  const removeItemToCart = (productToRemove) => {
    const cartRemoveItem = cartItemToRemove(cartItems, productToRemove);
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_CART_ITEM,
      payload: { removeCartItem: cartRemoveItem },
    });
  };

  const removeListItemToCart = (itemToRemove) => {
    const cartListItemToRemove = listItemToRemove(cartItems, itemToRemove);
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_CART_LIST_ITEM,
      payload: { removeCartListItem: cartListItemToRemove },
    });
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
