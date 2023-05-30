import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
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
