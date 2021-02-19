import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./StripePayment.css";
import { getCompleteName } from "../../Dictionary";

export const StripePayment = () => {
  const stripe = loadStripe(
    "pk_test_51IMcfSDJralPixYMYcqmdwXKdFhT0ZbkdpLtu1DjX3K9VSMv7OTdEbolmicfnVuDigV8xV2PeiDoPPGlLFRiV49x00HLxkwkxq"
  );
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};

function CheckoutForm() {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const payMoney = async e => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const clientSecret = "134_secret_587688";
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Faruq Yusuff"
          }
        }
      })
      .then(function(paymentResult) {
        setPaymentLoading(false);
        if (paymentResult.error) {
          alert(paymentResult.error.message);
        } else {
          if (paymentResult.paymentIntent.status === "succeeded") {
            alert("Success!");
          }
        }
      })
      .catch(function() {
        alert("Error");
      });
  };

  return (
    <div
      style={{
        padding: "3rem"
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto"
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%"
          }}
          onSubmit={payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white"
                  }
                }
              }}
            />
            <button className="pay-button" disabled={isPaymentLoading}>
              {isPaymentLoading
                ? getCompleteName("paymentLoading")
                : getCompleteName("pay")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
