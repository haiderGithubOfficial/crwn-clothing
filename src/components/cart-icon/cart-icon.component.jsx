import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./cart-icon.styles.jsx";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCartCount } from "../../store/cart/cart.selector";

const CartIcon = ({ dropdownHandler }) => {
  const cartCount = useSelector(selectCartCount);
  return (
    <CartIconContainer onClick={dropdownHandler}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
