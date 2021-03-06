import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { getTypeByKey } from "./OrderTypes";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";
import CreateReport from "../Report/CreateReport";
import { OrderStatus } from "./OrderStatus";
import OrderForm from "./OrderForm";
import { Redirect } from "react-router";

class EditViewOrder extends Component {
  constructor(props) {
    super(props);
    this.orderFormRef = React.createRef();
    this.api = new Api();
    this.state = {
      isLoading: false,
      initialState: null,
      openPaymentDialog: false,
      openDevisDialog: false,
      type: null
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  redirectToPayment = () => {
    if (this.state.openPaymentDialog) {
      return (
        <Redirect
          push
          to={{
            pathname: URLConstant.PAYMENT,
            state: {
              orderId: this.props.itemId,
              type: this.state.type.key
            }
          }}
        />
      );
    }
  };

  getOrder = async () => {
    let self = this;
    let postData = {
      id: this.props.itemId
    };
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_ORDER_BY_ID,
        postData
      )
      .then(function(res) {
        if (!res.success) self.props.showSnackbar(res.message, "error");
        else {
          self.setState({
            initialState: res.data.details,
            type: getTypeByKey(res.data.type),
            isLoading: false
          });
        }
      });
  };

  handleClosePaymentDialog = () => {
    this.setState({
      openPaymentDialog: false
    });
  };

  handleOpenPaymentDialog = () => {
    this.setState({
      openPaymentDialog: true
    });
  };

  handleCloseDevisDialog = () => {
    this.setState({
      openDevisDialog: false
    });
  };

  handleOpenDevisDialog = () => {
    this.setState({
      openDevisDialog: true
    });
  };

  handleSubmit = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.state.type.code === "DD"
          ? this.updateOrder(true, OrderStatus.PRE_BILL.name, "PRE-SUBMIT")
          : this.updateOrder(true, OrderStatus.PENDING.name, "SUBMIT");
      }
    );
  };

  updateOrder = (close, status, mode) => {
    let self = this;
    let orderFormState = this.orderFormRef.current.getState();
    let files = orderFormState
      ? orderFormState.files &&
        (orderFormState.files.length > 1 || orderFormState.files[0] !== "true")
        ? orderFormState.files
        : []
      : [];
    let additionalFiles = orderFormState
      ? orderFormState.additionalFiles &&
        (orderFormState.additionalFiles.length > 1 ||
          orderFormState.additionalFiles[0] !== "true")
        ? orderFormState.additionalFiles
        : []
      : [];
    orderFormState["files"] =
      orderFormState && orderFormState.files && orderFormState.files.length > 0
        ? ["true"]
        : [];
    orderFormState["additionalFiles"] =
      orderFormState &&
      orderFormState.additionalFiles &&
      orderFormState.additionalFiles.length > 0
        ? ["true"]
        : [];
    self.orderFormRef.current.onRefresh();
    let postData = {
      id: this.props.itemId,
      type: this.state.type ? this.state.type.code : "",
      status: status,
      mode: mode,
      details: orderFormState
    };
    this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CREATE_ORDER,
        postData
      )
      .then(function(res) {
        self.props.showSnackbar(res.message, res.success ? "success" : "error");
        self.handleFileSelect(files, "documents").then(() => {
          self.handleFileSelect(additionalFiles, "additional").then(() => {
            self.setState(
              {
                isLoading: false
              },
              () => {
                if (mode === "SUBMIT") self.handleOpenPaymentDialog();
                if (mode === "PRE-SUBMIT") self.handleOpenDevisDialog();
              }
            );
          });
        });
      });
  };

  redirectToDevis = () => {
    if (this.state.openDevisDialog) {
      return (
        <Redirect
          push
          to={{
            pathname: URLConstant.DEVIS_SUCCESS,
            state: {
              orderId: this.props.itemId,
              code: this.state.type.code
            }
          }}
        />
      );
    }
  };

  handleSave = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.updateOrder(false, OrderStatus.COMPLETING.name, "SAVE");
      }
    );
  };

  handleFileSelect = async (files, type) => {
    let self = this;
    for (let file of files) {
      let params = {
        type: type,
        name: file.name,
        orderId: self.props.itemId,
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

  render() {
    return (
      <Fragment>
        {this.props.type === "ADMIN" &&
          this.state.type &&
          this.state.type.reportData && (
            <CreateReport
              data={this.state.initialState}
              id={this.props.itemId}
              type={this.state.type}
            />
          )}
        {this.state.initialState && this.state.type && (
          <OrderForm
            ref={this.orderFormRef}
            onSubmit={this.handleSubmit}
            onSave={this.handleSave}
            isLoading={this.state.isLoading}
            initialState={this.state.initialState}
            form={this.state.type.form}
            code={this.state.type.code}
            itemId={this.props.itemId}
            onFileSelect={this.handleFileSelect}
          />
        )}
        {this.redirectToPayment()}
        {this.redirectToDevis()}
      </Fragment>
    );
  }
}

EditViewOrder.propTypes = {
  itemId: PropTypes.number.isRequired,
  type: PropTypes.string
};

export default SnackbarWrapper(EditViewOrder);
