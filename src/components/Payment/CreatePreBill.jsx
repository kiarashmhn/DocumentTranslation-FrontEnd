import React, { Component } from "react";
import PropTypes from "prop-types";
import FormDialog from "../Template/FormDialog";
import { Button } from "@material-ui/core";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import FieldInput from "../CustomInput/FieldInput";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";

export default class CreatePreBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      delay: null
    };
    this.api = new Api();
  }

  componentDidMount() {
    this.getOrder().then(() => {});
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
        self.setState({
          amount: res.data.preBillAmount,
          delay: res.data.preBillDelay
        });
      });
  };

  create = () => {
    this.setState({ loading: true }, async () => {
      let postData = {
        orderId: this.props.orderId,
        preBillAmount: this.state.amount,
        preBillDelay: this.state.delay
      };
      let self = this;
      await this.api
        .doPostNoAppend(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.CREATE_PRE_BILL,
          postData
        )
        .then(function(res) {
          if (res.success)
            self.setState({ loading: false }, () => {
              self.props.onClose();
            });
        });
    });
  };

  render() {
    return (
      <FormDialog
        open
        loading={this.state.loading}
        onClose={this.props.onClose}
        hideBackdrop={false}
        onFormSubmit={e => {
          e.preventDefault();
          this.create();
        }}
        hasCloseIcon
        content={
          <div>
            <FieldInput
              name={"amountInEuros"}
              value={this.state.amount}
              onChange={event => this.setState({ amount: event.target.value })}
              type={"number"}
            />
            <FieldInput
              name={"delayInHours"}
              value={this.state.delay}
              onChange={event => this.setState({ delay: event.target.value })}
              type={"number"}
            />
          </div>
        }
        actions={
          <div>
            <Button
              type={"submit"}
              fullWidth
              variant="contained"
              size="large"
              style={{
                marginTop: "10px",
                textTransform: "none",
                align: "center"
              }}
              disabled={this.state.loading}
            >
              Confirmer / تایید
              {this.state.loading && <ButtonCircularProgress />}
            </Button>
          </div>
        }
      />
    );
  }
}
CreatePreBill.propTypes = {
  orderId: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired
};
