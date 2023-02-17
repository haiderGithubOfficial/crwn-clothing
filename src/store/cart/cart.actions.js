import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


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


// All Actions

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCardItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};

export const removeItemToCart = (cartItems, productToRemove) => {
    const newCartItems = cartItemToRemove(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)

};

export const removeListItemToCart = (cartItems, itemToRemove) => {
    const newCartItems = listItemToRemove(cartItems, itemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};
export const setIsCartOpen = (display) => {

    return createAction(CART_ACTION_TYPES.CART_DROPDOWN, display);
};
