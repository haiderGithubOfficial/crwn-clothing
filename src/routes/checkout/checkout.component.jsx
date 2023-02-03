import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import { CartContext } from "../../contexts/cart.context";
import { CheckoutContainer } from "./checkout.styles";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <div className="checkout-header">
        <div className="header-block">
          <span>Products</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem, index) => {
        return <CheckoutItem key={index} cartItem={cartItem} />;
      })}
      <span className="total">Total: ${cartTotal}</span>
    </CheckoutContainer>
  );
};

export default Checkout;
