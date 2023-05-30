import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};


export const cartReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
                // cartItems: payload.cartItems,
                // cartCount: payload.cartCount,
                // cartTotal: payload.cartTotal, /// we use ...payload instead of these three lines
            };
        case CART_ACTION_TYPES.CART_DROPDOWN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            return state
    }
};

/* ----------------------------------------------- */

