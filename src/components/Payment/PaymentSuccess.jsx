import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getFrenchName, getPersianName } from "../../Dictionary";
import { Redirect } from "react-router";
import Box from "@material-ui/core/Box";
import { getTypeByKey } from "../order/OrderTypes";

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.location.state.amount,
      orderId: this.props.location.state.orderId,
      code: this.props.location.state.code,
      delay: getTypeByKey(this.props.location.state.code).delay,
      method: this.props.location.state.method,
      redirect: false
    };
  }

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    // eslint-disable-next-line no-unused-vars
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  redirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/",
            state: {
              redirect: true
            }
          }}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line", marginTop: "10px" }}
        >
          Information de paiement enregistrée avec succès
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          اطلاعات پرداخت با موفقيت ثبت شد
        </Typography>

        <Box
          borderColor="primary.main"
          bgcolor="background.paper"
          border={2}
          m={5}
        >
          <Typography
            paragraph
            variant="body1"
            align="center"
            style={{ padding: "10px" }}
            component={"div"}
          >
            Votre demande de traduction N⁰{""}
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              {this.state.code + "" + this.state.orderId}
            </Box>{" "}
            a bien été enregistrée et elle sera traitée dans les plus brefs
            délais. Nous reviendrons vers vous en cas de demande incomplète pour
            vous indiquerles renseignements manquants.{" "}
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              {this.state.delay}
            </Box>
            {""} heures après la validation de votre commande, vous pouvez
            télécharger la traduction certifiée à partir de votre espace client.
            Ainsi à tout moment, vous pouvez suivre l’état d’avancement de votre
            commande via votre comte &gt; liste de commande.
          </Typography>
          <Typography
            paragraph
            variant="body1"
            align="center"
            dir={"rtl"}
            style={{ padding: "10px" }}
            component={"div"}
          >
            درخواست ترجمه شما ثبت شده است. در صورت تکمیل بودن اطلاعات، درخواست
            تایید و ترجمه آغاز می شود و سند شما بعد از{" "}
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              {this.state.delay}
            </Box>
            {""} ساعت در حساب کاربری قابل دانلود خواهد بود. در غیر اینصورت،
            موارد نقص در حساب کاربری به شما اطلاع داده خواهد شد و تایید آن منوط
            به تکمیل آن می باشد. می توانید وضعیت سفارش خود را از طریق حساب
            کاربری &gt; لیست سفارشات دنبال کنید. برای اطلاع، شماره سفارش شما{" "}
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              {this.state.code + "" + this.state.orderId}
            </Box>{" "}
            میباشد.
          </Typography>
        </Box>
        <div
          style={{
            maxWidth: "100%",
            verticalAlign: "middle",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            marginTop: "10px",
            paddingBottom: "20px"
          }}
        >
          <Button
            onClick={() => {
              this.setState({ redirect: true });
            }}
            style={{ textTransform: "none" }}
            variant="contained"
            color="secondary"
            align={"center"}
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
                {getFrenchName("redirectToAccount")}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "2px",
                  fontSize: "100%"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getPersianName("redirectToAccount")}
              </Typography>
            </p>
          </Button>
        </div>
        {this.redirect()}
      </div>
    );
  }
}

PaymentSuccess.propTypes = {
  location: PropTypes.any
};
