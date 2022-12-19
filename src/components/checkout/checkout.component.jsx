import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "./checkout-list.component";

const Checkout = () => {
  const { cartItems, total } = useContext(CartContext);

  return (
    <div>
      {cartItems.map((item, index) => {
        return <CheckoutItem key={item.id} cartItem={item} />;
      })}
      {total}
    </div>
  );
};

export default Checkout;
