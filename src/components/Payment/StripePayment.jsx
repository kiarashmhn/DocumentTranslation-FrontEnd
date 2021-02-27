import React, { useState } from "react";
import {
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./StripePayment.css";
import { getFrenchName, getPersianName } from "../../Dictionary";
import { Button, Typography } from "@material-ui/core";

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
            <Typography paragraph variant="body1" align="center">
              {getFrenchName("enterCardInfo")}
            </Typography>
            <Typography paragraph variant="body1" align="center">
              {getPersianName("enterCardInfo")}
            </Typography>
            <CardNumberElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white"
                  }
                }
              }}
            />
            <CardExpiryElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white"
                  }
                }
              }}
            />
            <CardCvcElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white"
                  }
                }
              }}
            />
          </div>
          <div
            style={{
              maxWidth: "100%",
              verticalAlign: "middle",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              paddingBottom: "20px",
              marginTop: "5px"
            }}
          >
            <Button
              className="pay-button"
              disabled={isPaymentLoading}
              style={{ textTransform: "none" }}
              align={"center"}
              variant="contained"
              color="secondary"
              type={"submit"}
            >
              <p>
                <span
                  style={{
                    display: "block",
                    marginBottom: "0",
                    fontSize: 16
                  }}
                />
                <Typography variant="body1" align="center" component={"span"}>
                  {isPaymentLoading
                    ? getFrenchName("paymentLoading")
                    : getFrenchName("pay")}
                </Typography>
                <span
                  style={{
                    display: "block",
                    marginBottom: "2px",
                    fontSize: "100%"
                  }}
                />
                <Typography variant="body1" align="center" component={"span"}>
                  {isPaymentLoading
                    ? getPersianName("paymentLoading")
                    : getPersianName("pay")}
                </Typography>
              </p>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
