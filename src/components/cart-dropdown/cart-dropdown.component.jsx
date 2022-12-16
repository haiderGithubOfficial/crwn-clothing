import { useContext } from "react";
import Button from "../Button/Button.component";
import "./cart-dropdown.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItem } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItem.map((product, key) => {
          return <CartItem key={key} product={product} />;
        })}

        <Button>GO TO CHECKOUT</Button>
      </div>
    </div>
  );
};

export default CartDropdown;
