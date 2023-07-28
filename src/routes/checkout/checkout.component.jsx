import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import { CheckoutContainer } from "./checkout.styles";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(setIsCartOpen(false));
    if (cartTotal === 0) {
      navigate("/");
    }
  }, [[], cartTotal]);

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
        return (
          <CheckoutItem key={index} cartItems={cartItems} cartItem={cartItem} />
        );
      })}

      <span className="total">Total: ${cartTotal}</span>
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;
