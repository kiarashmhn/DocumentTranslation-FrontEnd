import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getFrenchName, getPersianName } from "../../Dictionary";
import { Redirect } from "react-router";
import Box from "@material-ui/core/Box";
import theme from "../../theme";
import AuthService from "../../AuthService";

export default class DevisSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.location.state.orderId,
      code: this.props.location.state.code,
      redirect: false,
      redirectToList: false
    };
    this.auth = new AuthService();
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

  redirectToList = () => {
    if (this.state.redirectToList) {
      if (this.auth.isAdmin())
        return (
          <Redirect
            push
            to={{
              pathname: "/AdminPanel",
              state: { selectedTab: "ListOrder" }
            }}
          />
        );
      else
        return (
          <Redirect
            push
            to={{
              pathname: "/UserPanel",
              state: { selectedTab: "ListOrder" }
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
          Votre demande de devis est enregistrée
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          درخواست شما برای پیش‌فاکتور ثبت شد
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
            Votre demande de devis N⁰{""}
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              {this.state.code + "" + this.state.orderId}
            </Box>{" "}
            sera traitée dans les plus brefs délais. Nous vous contacterons via
            la messagerie de votre compte si nous avons besoin d&apos;autres
            informations. Vous pouvez suivre l’état d’avancement de votre
            demande et télécharger votre devis via{" "}
            <span
              style={{ color: theme.palette.secondary.main, cursor: "pointer" }}
              onClick={() => {
                this.setState({ redirectToList: true });
              }}
            >
              votre compte &gt; liste de commandes
            </span>{" "}
            .
          </Typography>
          <Typography
            paragraph
            variant="body1"
            align="center"
            dir={"rtl"}
            style={{ padding: "10px" }}
            component={"div"}
          >
            به درخواست شماره{" "}
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              {this.state.code + "" + this.state.orderId}
            </Box>{" "}
            شما برای پیش‌فاکتور در اسرع وقت رسیدگی می شود. در صورت نیاز به
            اطلاعات بیشتر، بوسیله پیام‌رسان حساب کاربری با شما تماس خواهیم گرفت.
            همچنین، از طریق{" "}
            <span
              style={{ color: theme.palette.secondary.main, cursor: "pointer" }}
              onClick={() => {
                this.setState({ redirectToList: true });
              }}
            >
              حساب کاربری &gt; لیست سفارش‌ها
            </span>{" "}
            می توانید روند وضعیت درخواست خود را دنبال کرده و پیش‌فاکتور خود را
            بارگیری کنید.
            {""}
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
        {this.redirectToList()}
      </div>
    );
  }
}

DevisSuccess.propTypes = {
  location: PropTypes.any
};
