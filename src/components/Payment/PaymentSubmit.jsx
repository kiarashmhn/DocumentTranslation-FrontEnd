import React, { Component, Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { getFrenchName, getPersianName } from "../../Dictionary";
import FieldInput from "../CustomInput/FieldInput";
import PropTypes from "prop-types";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import CustomTooltip from "../Tooltip/CustomTooltip";
import Divider from "@material-ui/core/Divider";
import * as URLConstant from "../../URLConstant";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import Api from "../Api/Api";
import { Redirect } from "react-router";
import AuthService from "../../AuthService";
import Checkbox from "@material-ui/core/Checkbox";

class PaymentSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      code: "",
      redirect: false,
      approval: false
    };
    this.uploadFileRef = React.createRef();
    this.api = new Api();
    this.auth = new AuthService();
  }

  fileOnChange = event => {
    this.setState({ files: event.target.files });
  };

  handleFileSelect = async () => {
    let self = this;
    for (let file of this.state.files) {
      let params = {
        type: "payment",
        name: file.name,
        orderId: this.props.id,
        size: file.size
      };
      await this.api
        .doPostMultiPartFileAndHeader(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.CREATE_DOCUMENT,
          file,
          params
        )
        .then(function(res) {
          if (!res.success) self.props.showSnackbar(res.message, "error");
        });
    }
  };

  doPay = () => {
    let self = this;
    let postData = {
      orderId: this.props.id,
      method: this.props.idx,
      amount: this.props.price,
      deliveryType: this.props.deliveryType,
      code: this.state.code
    };
    this.api
      .doPost(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.PAY_ORDER,
        postData
      )
      .then(function(res) {
        if (!res.success) self.props.showSnackbar(res.message, "error");
        self.setState(
          {
            isLoading: false
          },
          () => {
            if (res.success)
              self.handleFileSelect().then(() => {
                self.props.showSnackbar(res.message, "success");
                self.setState({ redirect: true });
              });
          }
        );
      });
  };

  submitPayment = e => {
    e.preventDefault();
    let self = this;
    if (!this.state.code && this.state.files.length === 0)
      self.props.showSnackbar(getPersianName("receiptInfo"), "error");
    else this.doPay();
  };

  redirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/PaymentSuccess",
            state: {
              orderId: this.props.id,
              method: this.props.idx,
              amount: this.props.price,
              code: this.props.code
            }
          }}
        />
      );
    }
  };

  render() {
    return (
      <Fragment>
        <Divider style={{ margin: "4px 2px" }} />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          alignContent={"center"}
        >
          <Grid item xs={12} md={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justify: "center",
                justifyContent: "center"
              }}
            >
              <Typography
                paragraph
                variant="h6"
                align="center"
                style={{ marginTop: "18px" }}
              >
                {this.props.idx === 2
                  ? getFrenchName("chequeInfo")
                  : getFrenchName("receiptInfo")}
              </Typography>
              <CustomTooltip text={getFrenchName("sendInfo")} />
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justify: "center",
                justifyContent: "center"
              }}
            >
              <div style={{ marginBottom: "18px" }}>
                <CustomTooltip text={getPersianName("sendInfo")} dir={"rtl"} />
              </div>
              <Typography paragraph variant="h6" align="center" dir="rtl">
                {this.props.idx === 2
                  ? getPersianName("chequeInfo")
                  : getPersianName("receiptInfo")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CustomFileUpload
              onChange={event => this.fileOnChange(event)}
              ref={this.uploadFileRef}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <FieldInput
              name={this.props.inputKey}
              value={this.state.code}
              onChange={event => this.setState({ code: event.target.value })}
              notRequired={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginTop: "40px"
              }}
            >
              <Checkbox
                checked={!!this.state.approval}
                onChange={e =>
                  this.setState({
                    approval: e.target.checked
                  })
                }
                name={"approval"}
                color="secondary"
              />
              <Typography
                paragraph
                variant="body1"
                align="center"
                style={{ marginTop: "17px" }}
              >
                {getFrenchName("paymentApproval")}
              </Typography>
            </div>
            <Typography paragraph variant="body1" align="center" dir={"rtl"}>
              {getPersianName("paymentApproval")}
            </Typography>
          </Grid>
        </Grid>
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
            onClick={this.submitPayment}
            style={{ textTransform: "none" }}
            variant="contained"
            color="secondary"
            align={"center"}
            disabled={!this.state.approval}
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
                {getFrenchName("finalSubmit")}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "2px",
                  fontSize: "100%"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getPersianName("finalSubmit")}
              </Typography>
            </p>
          </Button>
        </div>
        {this.redirect()}
      </Fragment>
    );
  }
}

export default SnackbarWrapper(PaymentSubmit);

PaymentSubmit.propTypes = {
  id: PropTypes.any.isRequired,
  idx: PropTypes.any.isRequired,
  code: PropTypes.any.isRequired,
  price: PropTypes.any.isRequired,
  deliveryType: PropTypes.any.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  inputKey: PropTypes.string.isRequired
};
