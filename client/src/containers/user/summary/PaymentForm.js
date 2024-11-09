import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const PaymentForm = () => {
  const [amount, setAmaount] = useState("");
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.stripe.com/checkout.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const handlePayment = () => {
    if (!window.StripeCheckout) {
      console.error("Stripe Checkout is not loaded yet.");
      return;
    }
    var handler = window.StripeCheckout.configure({
      key: "pk_test_51OdzTIFpiA74WvTWxmL6JVHTYuvqp95ur8Zz4J0Hw28gGP4Md7S3J0EhvnjLoECfrSBSjaG6z532sEL1Y7nF3qiY00YyPq9654",
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: "auto",
      token: function (token) {
        console.log(token);
        axios
          .post("https://localhost:7271/api/Payment/charge", {
            amount: amount,
            token: token.id,
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Payment Successful💲",
              text: "Thank you for your payment!😊",
            });
            setAmaount(""); 
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error:", error.response.data);
          });
      },
    });
    handler.open({
      name: "Test Name",
      description: "Test Description",
      currency: "usd",
      email: "example@example.com",
    });
  };
  const handleAmountChange = (e) => {
    setAmaount(e.target.value);
  };
  return (
    <div style={{ marginLeft: "42%", marginTop: "16%" }}>
      <h2>Payment Gateway💰</h2>
      <input
        type="number"
        min="1"
        name="amount"
        placeholder="$ Enter Amount"
        className="form-control rounded col-4 p-3"
        value={amount}
        onChange={handleAmountChange}
      />
      <button className="col-4 rounded" onClick={handlePayment}>
        Checkout
      </button>
    </div>
  );
};

export default PaymentForm;
