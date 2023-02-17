import { CheckoutItemContainer } from "./checkout-item.styles.jsx";
import React from "react";

import { useDispatch } from "react-redux/es/hooks/useDispatch.js";
import {
  addItemToCart,
  removeItemToCart,
  removeListItemToCart,
} from "../../store/cart/cart.actions.js";

const CheckoutItem = ({ cartItems, cartItem }) => {
  const dispatch = useDispatch();

  const incrementHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const decrementHandler = () =>
    dispatch(removeItemToCart(cartItems, cartItem));
  const removeCartItemHandler = () =>
    dispatch(removeListItemToCart(cartItems, cartItem));

  const { name, imageUrl, quantity, price } = cartItem;
  return (
    <CheckoutItemContainer>
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={decrementHandler} className="arrow">
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={incrementHandler} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">
        <b>$</b>&nbsp;
        {price}
      </span>
      <div onClick={removeCartItemHandler} className="remove-button">
        &#10005;
      </div>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
