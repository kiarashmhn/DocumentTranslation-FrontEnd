import React, { Component, Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";
import MediaCard from "../MediaCard";
import PropTypes from "prop-types";
import image from "../../images/identityCard.jpg";
import FullScreenDialog from "../FullScreenDialog";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { OrderTypes } from "./OrderTypes";
import { OrderStatus } from "./OrderStatus";
import Box from "@material-ui/core/Box";
import CreateOrderForm from "./CreateOrderForm";
import { idCertificateForm } from "./IDCertificate";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.identityCertificateRef = React.createRef();
    this.api = new Api();
    this.state = {
      openIdentityDialog: false,
      isLoading: false,
      id: null
    };
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

  createOrder = (close, status) => {
    let self = this;
    let postData = {
      type: OrderTypes.ID_CERTIFICATE.name,
      details: this.identityCertificateRef.current.getState(),
      status: status
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
        self.setState(
          {
            isLoading: false
          },
          () => {
            if (res.success)
              self.setState({
                id: res.data.id
              });
          }
        );
        if (close && res.success)
          self.setState({
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
        this.createOrder(true, OrderStatus.PENDING.name);
      }
    );
  };

  handleSave = e => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.createOrder(false, OrderStatus.COMPLETING.name);
      }
    );
  };

  render() {
    return (
      <Fragment>
        <Box
          borderColor="error.main"
          bgcolor="background.paper"
          border={1}
          style={{ padding: "10px", marginBottom: "30px" }}
          m={5}
        >
          <Fragment>
            <Typography variant="body1" color={"error"} paragraph>
              * pointe:
            </Typography>
            <Typography variant="body1" paragraph>
              Il est fortement recommandé de concorder l&apos;orthographe des
              noms, prénoms et les dates à celles déjà déclarées antérieurement
              auprès des administrations (préfecture, OFPRA, récépissé, titre de
              séjour, passeport…).
            </Typography>
            <br />
            <Typography variant="body1" dir={"rtl"} color={"error"} paragraph>
              * نکته:
            </Typography>
            <Typography variant="body1" dir={"rtl"} paragraph>
              توصیه می شود که نوشتار لاتین نام، نام خانوادگی (تخلص)، تاریخ تولد
              و دیگر مشخصات را با پاسپورت یا مدارک دیگر مثل کارت اقامت خود حتما
              مطابقت دهید.
            </Typography>
            <br />
          </Fragment>
        </Box>
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
                <CreateOrderForm
                  form={idCertificateForm}
                  ref={this.identityCertificateRef}
                  onSubmit={this.handleSubmit}
                  onSave={this.handleSave}
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
