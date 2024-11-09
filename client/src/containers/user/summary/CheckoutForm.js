import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(
      "sk_test_51OWYPOJD4X8VwIlFsHNv2IqLQUZzCNgGoYpuJXc5EpzVxOD0Scx4FN4BXoqL5ag1gDkMEW0kMo3IlJgeMvcUsepU00gsDklxBu",
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (result.error) {
      setError(result.error.message);
    } else {
      navigate(ROUTES.home.name);
    }
  };

  return (
    <div>
      msg
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
