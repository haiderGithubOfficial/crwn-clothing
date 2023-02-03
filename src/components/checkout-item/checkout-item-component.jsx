import { CheckoutItemContainer } from "./checkout-item.styles.jsx";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import React from "react";

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemToCart, removeListItemToCart } =
    useContext(CartContext);

  const incrementHandler = () => addItemToCart(cartItem);
  const decrementHandler = () => removeItemToCart(cartItem);
  const removeCartItemHandler = () => removeListItemToCart(cartItem);

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
