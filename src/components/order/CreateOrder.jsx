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
import OrderForm from "./OrderForm";
import { getFrenchName, getPersianName } from "../../Dictionary";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.orderFormRef = React.createRef();
    this.api = new Api();
    this.state = {
      openIdentityDialog: false,
      isLoading: false,
      type: null,
      id: null
    };
  }

  handleOpenDialog = type => {
    this.setState({
      openIdentityDialog: true,
      type: type
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openIdentityDialog: false
    });
  };

  createOrder = (close, status) => {
    let self = this;
    let orderFormState = this.orderFormRef.current.getState();
    let files = orderFormState
      ? orderFormState.files
        ? orderFormState.files
        : []
      : [];
    delete orderFormState["files"];
    let postData = {
      id: this.state.id,
      type: this.state.type.key,
      details: orderFormState,
      status: status
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
        self.setState(
          {
            isLoading: false
          },
          () => {
            if (res.success)
              self.setState(
                {
                  id: res.data.id
                },
                () => {
                  self.handleFileSelect(files).then(() => {
                    self.orderFormRef.current.onRefresh();
                  });
                }
              );
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

  handleSave = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.createOrder(false, OrderStatus.COMPLETING.name);
      }
    );
  };

  handleFileSelect = async files => {
    let self = this;
    for (let file of files) {
      let params = {
        type: "documents",
        name: file.name,
        orderId: this.state.id,
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
        <Grid container spacing={1} justify="center">
          {Object.keys(OrderTypes).map(typeKey => {
            let type = OrderTypes[typeKey];
            return (
              <Grid item xs={12} sm={12} md={4} align="center" key={typeKey}>
                <MediaCard
                  image={image}
                  title={getFrenchName(type.key)}
                  onClick={() => this.handleOpenDialog(type)}
                  secondaryTitle={getPersianName(type.key)}
                />
              </Grid>
            );
          })}
        </Grid>
        {this.state.type && (
          <FullScreenDialog
            title="test"
            component={
              <OrderForm
                form={this.state.type.form}
                ref={this.orderFormRef}
                onSubmit={this.handleSubmit}
                onSave={this.handleSave}
                itemId={this.state.id}
                isLoading={this.state.isLoading}
              />
            }
            handleClose={this.handleCloseDialog}
            open={this.state.openIdentityDialog}
          />
        )}
      </Fragment>
    );
  }
}

export default SnackbarWrapper(CreateOrder);

CreateOrder.propTypes = {
  selectCreateOrder: PropTypes.func,
  showSnackbar: PropTypes.func.isRequired
};
