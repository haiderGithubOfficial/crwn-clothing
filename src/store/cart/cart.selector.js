
export const selectCartItems = (state) => state.cart.cartItems;

export const selectIsCartOpen = (state) => state.cart.isCartOpen;

export const selectCartCount = (state) => state.cart.cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0 // 0 is a reducer function initializer
);

export const selectCartTotal = (state) => state.cart.cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem?.price,
    0
);