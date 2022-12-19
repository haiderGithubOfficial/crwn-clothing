import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Link, Outlet } from "react-router-dom";
import Button from "../Button/Button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
        <Link to={"/checkout"}>
          <Button>GO TO CHECKOUT</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
