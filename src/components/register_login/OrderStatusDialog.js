import React, { Component, Fragment } from "react";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";
import FormDialog from "../Template/FormDialog";
import { TextField, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { getFrenchName, getPersianName } from "../../Dictionary";

const styles = () => ({
  root: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.9)" // (default alpha is 0.38)
    }
  }
});

class OrderStatusDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDate: "",
      deliveryDate: "",
      acceptanceDate: ""
    };
    this.api = new Api();
  }

  componentDidMount() {
    this.getOrder();
  }

  getOrder = async () => {
    let self = this;
    let postData = {
      id: this.props.orderId
    };
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_ORDER_BY_ID,
        postData
      )
      .then(function(res) {
        if (res.success) {
          self.setState({
            submitDate: res.data.submitDate ? res.data.submitDate : "-",
            deliveryDate: res.data.deliveryDate ? res.data.deliveryDate : "-",
            acceptanceDate: res.data.acceptanceDate
              ? res.data.acceptanceDate
              : "-"
          });
        }
      });
  };

  render() {
    return (
      <FormDialog
        open
        onClose={this.props.onClose}
        headline="État / وضعیت سفارش"
        hideBackdrop
        hasCloseIcon
        content={
          <Fragment>
            <TextField
              className={this.props.classes.root}
              value={this.state.submitDate}
              margin="normal"
              disabled
              fullWidth
              label={getFrenchName("submitDate")}
              type="text"
              helperText={getPersianName("submitDate")}
            />
            <TextField
              className={this.props.classes.root}
              value={this.state.acceptanceDate}
              margin="normal"
              disabled
              fullWidth
              label={getFrenchName("acceptanceDate")}
              type="text"
              helperText={getPersianName("acceptanceDate")}
            />
            <TextField
              className={this.props.classes.root}
              value={this.state.deliveryDate}
              margin="normal"
              disabled
              fullWidth
              label={getFrenchName("deliveryDate")}
              type="text"
              helperText={getPersianName("deliveryDate")}
            />
          </Fragment>
        }
        actions={<span />}
      />
    );
  }
}
export default withStyles(styles, { withTheme: true })(OrderStatusDialog);
OrderStatusDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired
};
