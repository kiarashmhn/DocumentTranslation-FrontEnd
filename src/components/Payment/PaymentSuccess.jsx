import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Bill from "./Bill";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@material-ui/core/Button";
import { getFrenchName, getPersianName } from "../../Dictionary";

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.location.state.amount,
      orderId: this.props.location.state.orderId,
      code: this.props.location.state.code,
      method: this.props.location.state.method
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
          style={{ whiteSpace: "pre-line", marginBottom: "5px" }}
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
            paddingBottom: "20px",
            marginTop: "2px"
          }}
        >
          <Button
            onClick={this.exportPdf}
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
        </div>
      </div>
    );
  }
}

PaymentSuccess.propTypes = {
  location: PropTypes.any
};
