import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { Redirect } from "react-router";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { getFrenchName, getPersianName } from "../../Dictionary";
import PreBill from "./PreBill";
import * as URLConstant from "../../URLConstant";

export default class ShowPreBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.orderId,
      redirect: false,
      openPaymentDialog: false
    };
  }

  exportPdf = () => {
    window.scrollTo(0, 0);
    html2canvas(document.querySelector("#pre-bill-box"), {
      logging: false,
      allowTaint: true,
      windowWidth: "1360px",
      width: "1360",
      scrollY: window.pageYOffset + 100,
      height: "768",
      windowHeight: "768px"
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/jpg");
      const pdf = new JsPDF({
        orientation: "l", // landscape
        unit: "pt", // points, pixels won't work properly
        format: [canvas.width, canvas.height] // set needed dimensions for any element
      });
      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save("devis.pdf");
    });
  };

  redirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/"
          }}
        />
      );
    }
  };

  redirectToPayment = () => {
    if (this.state.openPaymentDialog) {
      return (
        <Redirect
          push
          to={{
            pathname: URLConstant.PAYMENT,
            state: {
              orderId: this.props.orderId,
              type: "other"
            }
          }}
        />
      );
    }
  };

  render() {
    return (
      <Fragment>
        <div id={"pre-bill-box"}>
          <Box
            borderColor="primary.main"
            bgcolor="background.paper"
            border={2}
            m={5}
          >
            <PreBill orderId={this.state.orderId} />
          </Box>
        </div>
        <div
          style={{
            maxWidth: "100%",
            verticalAlign: "middle",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            paddingBottom: "20px"
          }}
        >
          <Button
            onClick={this.exportPdf}
            style={{ textTransform: "none", marginRight: "5px" }}
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
                {"Télécharger devis"}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "2px",
                  fontSize: "100%"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {"دریافت پیش فاکتور"}
              </Typography>
            </p>
          </Button>
          <Button
            onClick={() => {
              this.setState({ redirect: true });
            }}
            style={{ textTransform: "none", marginLeft: "5px" }}
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
          <Button
            onClick={() => {
              this.setState({ openPaymentDialog: true });
            }}
            style={{ textTransform: "none", marginLeft: "5px" }}
            variant="contained"
            color="primary"
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
                {getFrenchName("pay")}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "2px",
                  fontSize: "100%"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getPersianName("pay")}
              </Typography>
            </p>
          </Button>
        </div>
        {this.redirect()}
        {this.redirectToPayment()}
      </Fragment>
    );
  }
}
ShowPreBill.propTypes = {
  orderId: PropTypes.any.isRequired
};
