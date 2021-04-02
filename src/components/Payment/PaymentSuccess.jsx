import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import Bill from "./Bill";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@material-ui/core/Button";
import { getFrenchName, getPersianName } from "../../Dictionary";
import { Redirect } from "react-router";

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.location.state.amount,
      orderId: this.props.location.state.orderId,
      code: this.props.location.state.code,
      method: this.props.location.state.method,
      redirect: false
    };
  }

  exportPdf = () => {
    window.scrollTo(0, 0);
    html2canvas(document.querySelector("#bill-box"), {
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
      pdf.save("facture.pdf");
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
          Paiement enregistré avec succès
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          پرداخت با موفقیت ثبت شد
        </Typography>
        <div id={"bill-box"}>
          <Box
            borderColor="primary.main"
            bgcolor="background.paper"
            border={2}
            m={5}
          >
            <Bill
              amount={this.state.amount}
              orderId={this.state.orderId}
              code={this.state.code}
              method={this.state.method}
            />
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
                {getFrenchName("downloadBill")}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "2px",
                  fontSize: "100%"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getPersianName("downloadBill")}
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
        </div>
        {this.redirect()}
      </div>
    );
  }
}

PaymentSuccess.propTypes = {
  location: PropTypes.any
};
