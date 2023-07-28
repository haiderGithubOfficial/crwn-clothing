import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import Button, { BUTTON_TYPE_CLASSES } from "../Button/Button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
import SuccessIcon from "../successIcon/success-icon-component";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState({});

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessingPayment(false);
    setPaymentResult(paymentResult);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          {paymentResult?.paymentIntent?.status === "succeeded" ? (
            <SuccessIcon />
          ) : paymentResult?.error ? (
            "Empty or wrong credentials"
          ) : (
            "pay Now"
          )}
        </Button>
        <div className="checkout-footer">
          <p>Card number: </p>
          <p>4242 4242 4242 4242</p>
          <p>MM/YY: </p>
          <p>04 / 24 </p>
          <p>CVC: </p>
          <p>242</p>
          <p>ZIP: </p>
          <p>42424</p>
        </div>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
