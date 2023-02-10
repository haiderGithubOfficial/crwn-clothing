import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

import Button from "../Button/Button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();
  const gotoCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          <>
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
            <Button onClick={gotoCheckoutHandler}>GO TO CHECKOUT</Button>
          </>
        ) : (
          <EmptyMessage>Your Cart is Empty</EmptyMessage>
        )}
      </CartItems>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
