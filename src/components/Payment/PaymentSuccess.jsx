import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Bill from "./Bill";

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

  render() {
    return (
      <div>
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          Paiement enregistré avec succès
        </Typography>
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          پرداخت با موفقیت ثبت شد
        </Typography>
        <Box
          borderColor="primary.main"
          bgcolor="background.paper"
          border={2}
          style={{ padding: "10px", marginTop: "8px" }}
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
    );
  }
}

PaymentSuccess.propTypes = {
  location: PropTypes.any
};
