import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";
import IdentityCertificate from "./IdentityCertificate";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { OrderTypes } from "./OrderTypes";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";
import CreateReport from "../Report/CreateReport";

class EditViewOrder extends Component {
  constructor(props) {
    super(props);
    this.identityCertificateRef = React.createRef();
    this.api = new Api();
    this.state = {
      openIdentityDialog: false,
      isLoading: false,
      initialState: null
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  getOrder = async () => {
    let self = this;
    let postData = {
      id: this.props.itemId
    };
    await this.api
      .doPost(
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
            isLoading: false
          });
        }
      });
  };

  handleSubmit = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.updateOrder(true);
      }
    );
  };

  updateOrder = () => {
    let self = this;
    let postData = {
      type: OrderTypes.ID_CERTIFICATE.name,
      details: this.identityCertificateRef.current.getState()
    };
    this.api
      .doPost(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CREATE_ORDER,
        postData
      )
      .then(function(res) {
        self.props.showSnackbar(res.message, res.success ? "success" : "error");
        self.setState({
          isLoading: false
        });
        if (close && res.success)
          self.setState({
            openIdentityDialog: false
          });
      });
  };

  handleSave = e => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.updateOrder(false);
      }
    );
  };

  render() {
    return (
      <Fragment>
        <CreateReport data={this.state.initialState} />
        <IdentityCertificate
          ref={this.identityCertificateRef}
          onSubmit={this.handleSubmit}
          onSave={this.handleSave}
          isLoading={this.state.isLoading}
          initialState={this.state.initialState}
        />
      </Fragment>
    );
  }
}

EditViewOrder.propTypes = {
  itemId: PropTypes.number.isRequired
};

export default SnackbarWrapper(EditViewOrder);
