import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import MediaCard from "../../custom/MediaCard";
import IdentityCertificate from "./IdentityCertificate";
import PropTypes from "prop-types";
import image from "../../images/identityCard.jpg";
import FullScreenDialog from "../../custom/FullScreenDialog";
import Api from "../../custom/Api/Api";
import * as URLConstant from "../../URLConstant";
import SnackbarWrapper from "../../custom/Snackbar/SnackbarWrapper";
import { OrderTypes } from "./OrderTypes";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.identityCertificateRef = React.createRef();
    this.api = new Api();
    this.state = {
      openIdentityDialog: false,
      isLoading: false
    };
  }

  componentDidMount() {
    console.log("in order");
    //this.props.selectCreateOrder();
  }

  handleOpenDialog = () => {
    this.setState({
      openIdentityDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openIdentityDialog: false
    });
  };

  createOrder = () => {
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
          isLoading: false,
          openIdentityDialog: false
        });
      });
  };

  handleSubmit = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.createOrder();
      }
    );
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={1} dir={"rtl"}>
          <Grid item xs={12} sm={12} md={4} key={"identityCard"}>
            <MediaCard
              image={image}
              title={"شناسنامه"}
              onClick={this.handleOpenDialog}
              secondaryTitle={"درخواست ترجمه شناسنامه"}
            />
            <FullScreenDialog
              title="test"
              component={
                <IdentityCertificate
                  ref={this.identityCertificateRef}
                  onSubmit={this.handleSubmit}
                  isLoading={this.state.isLoading}
                />
              }
              handleClose={this.handleCloseDialog}
              open={this.state.openIdentityDialog}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default SnackbarWrapper(CreateOrder);

CreateOrder.propTypes = {
  selectCreateOrder: PropTypes.func,
  showSnackbar: PropTypes.func.isRequired
};
