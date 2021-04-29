import React, { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./StripePayment.css";
import { getFrenchName, getPersianName } from "../../Dictionary";
import { Button, Typography } from "@material-ui/core";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";
import PropTypes from "prop-types";
import AuthService from "../../AuthService";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { Redirect } from "react-router";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

function StripePayment(props) {
  const { amount, orderId, code, deliveryType, showSnackbar } = props;

  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [approval, setApproval] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const Auth = new AuthService();
  const api = new Api();
  const postData = {
    amount: amount,
    orderId: orderId,
    code: code,
    deliveryType: deliveryType
  };

  useEffect(() => {
    api
      .doPost(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.STRIPE_PAY_ORDER,
        postData
      )
      .then(function(res) {
        setClientSecret(res.data.clientSecret);
      });
  }, [setClientSecret]);

  const payMoney = async e => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const completePostData = { ...postData, ...{ method: 0 } };
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: Auth.getUsername()
          }
        }
      })
      .then(function(paymentResult) {
        setPaymentLoading(false);
        if (paymentResult.error) {
          showSnackbar(paymentResult.error.message, "error");
        } else {
          if (paymentResult.paymentIntent.status === "succeeded") {
            api
              .doPost(
                process.env.REACT_APP_HOST_URL +
                  process.env.REACT_APP_MAIN_PATH +
                  URLConstant.PAY_ORDER,
                completePostData
              )
              .then(function(res) {
                if (!res.success) showSnackbar(res.message, "error");
                else {
                  showSnackbar(res.message, "success");
                  setRedirect(true);
                }
              });
          }
        }
      })
      .catch(function() {
        showSnackbar("error in payment", "error");
      });
  };

  const redirectToSuccess = () => {
    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/PaymentSuccess",
            state: {
              orderId: orderId,
              method: 0,
              amount: amount,
              code: code
            }
          }}
        />
      );
    }
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
            <div
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/logged_in/creditcards.png)`,
                backgroundRepeat: "no-repeat",
                verticalAlign: "middle",
                backgroundSize: "contain",
                height: "60px",
                width: "240px"
              }}
            />
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
                },
                showIcon: true,
                placeholder: "Card Number"
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
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginTop: "40px"
              }}
            >
              <Checkbox
                checked={!!approval}
                onChange={e => setApproval(e.target.checked)}
                name={"approval"}
                color="secondary"
              />
              <Typography
                paragraph
                variant="body1"
                align="center"
                style={{ marginTop: "17px" }}
              >
                J’ai pris connaissance des{" "}
                <Link to={{ pathname: "/LegalNotes" }} target={"_blank"}>
                  {" "}
                  <Box
                    fontStyle="bold"
                    fontWeight="fontWeightMedium"
                    display="inline"
                  >
                    conditions générales de vente
                  </Box>
                </Link>
                .
              </Typography>
            </div>
            <Typography paragraph variant="body1" align="center" dir={"rtl"}>
              تاييد ميكنم که{" "}
              <Link to={{ pathname: "/LegalNotes" }} target={"_blank"}>
                {" "}
                <Box
                  fontStyle="bold"
                  fontWeight="fontWeightMedium"
                  display="inline"
                >
                  شرايط فروش
                </Box>
              </Link>{" "}
              را می‌دانم.
            </Typography>
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
              disabled={isPaymentLoading || !approval}
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
      {redirectToSuccess()}
    </div>
  );
}

export default SnackbarWrapper(StripePayment);

StripePayment.propTypes = {
  amount: PropTypes.any.isRequired,
  orderId: PropTypes.any.isRequired,
  code: PropTypes.any.isRequired,
  deliveryType: PropTypes.any.isRequired,
  showSnackbar: PropTypes.func.isRequired
};
