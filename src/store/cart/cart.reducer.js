const INITIAL_STATE = {
    display: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};



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

