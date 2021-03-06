import React, { Component, Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import FullScreenDialog from "../FullScreenDialog";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { OrderTypes } from "./OrderTypes";
import { OrderStatus } from "./OrderStatus";
import Box from "@material-ui/core/Box";
import OrderForm from "./OrderForm";
import { Redirect } from "react-router";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import theme from "../../theme";
import FeatureCard from "../home/FeatureCard";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.orderFormRef = React.createRef();
    this.api = new Api();
    this.state = {
      openIdentityDialog: false,
      openPaymentDialog: false,
      openDevisDialog: false,
      isLoading: false,
      type: null,
      id: null,
      nationality: "Afghan"
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

  showAfghan = () => {
    this.setState({
      nationality: "Afghan"
    });
  };

  showIranian = () => {
    this.setState({
      nationality: "Iranian"
    });
  };

  createOrder = (close, status, mode) => {
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
      id: this.state.id,
      type: this.state.type.code,
      details: orderFormState,
      mode: mode,
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
                  self.handleFileSelect(files, "documents").then(() => {
                    self
                      .handleFileSelect(additionalFiles, "additional")
                      .then(() => {});
                  });

                  if (mode === "SUBMIT") self.handleOpenPaymentDialog();
                  if (mode === "PRE-SUBMIT") self.handleOpenDevisDialog();
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
        this.state.type.code === "DD"
          ? this.createOrder(true, OrderStatus.PRE_BILL.name, "PRE-SUBMIT")
          : this.createOrder(true, OrderStatus.PENDING.name, "SUBMIT");
      }
    );
  };

  handleSave = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.createOrder(false, OrderStatus.COMPLETING.name, "SAVE");
      }
    );
  };

  handleFileSelect = async (files, type) => {
    let self = this;
    for (let file of files) {
      let params = {
        type: type,
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

  redirectToPayment = () => {
    if (this.state.openPaymentDialog) {
      return (
        <Redirect
          push
          to={{
            pathname: URLConstant.PAYMENT,
            state: {
              orderId: this.state.id,
              type: this.state.type.key
            }
          }}
        />
      );
    }
  };

  redirectToDevis = () => {
    if (this.state.openDevisDialog) {
      return (
        <Redirect
          push
          to={{
            pathname: URLConstant.DEVIS_SUCCESS,
            state: {
              orderId: this.state.id,
              code: this.state.type.code
            }
          }}
        />
      );
    }
  };

  render() {
    return (
      <Fragment>
        <Box
          borderColor={theme.palette.secondary.main}
          bgcolor="background.paper"
          border={2}
          style={{ padding: "5px", marginBottom: "30px" }}
          m={5}
        >
          <Fragment>
            <Typography variant="body1" color={"secondary"}>
              * Remarque:
            </Typography>
            <Typography variant="body1" component={"div"}>
              <div>
                - Il est fortement recommandé de concorder l&apos;orthographe
                des noms, prénoms et les dates à celles déjà déclarées
                antérieurement auprès des administrations (préfecture, OFPRA,
                récépissé, titre de séjour, passeport…).
              </div>
              <div>
                - Utiliser exclusivement{" "}
                <span style={{ color: theme.palette.danger.main }}>
                  l&apos;alphabet latin
                </span>{" "}
                pour remplir les formulaires.
              </div>
            </Typography>
            <Typography variant="body1" dir={"rtl"} color={"secondary"}>
              * نکته:
            </Typography>
            <Typography variant="body1" dir={"rtl"} component={"div"}>
              <div>
                - توصیه می شود که نوشتار لاتین نام، نام خانوادگی (تخلص)، تاریخ
                تولد و دیگر مشخصات را با پاسپورت یا مدارک دیگر مثل کارت اقامت
                خود حتما مطابقت دهید.
              </div>
              <div>
                - فرم‌ها باید به{" "}
                <span style={{ color: theme.palette.danger.main }}>
                  الفبای لاتین
                </span>{" "}
                نوشته شوند.
              </div>
            </Typography>
          </Fragment>
        </Box>
        <Grid
          container
          spacing={3}
          alignItems="center"
          direction="row"
          justify="center"
          alignContent={"center"}
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} md={4} key={"afghan"}>
            <Card
              style={{
                backgroundColor:
                  this.state.nationality === "Afghan"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main
              }}
            >
              <CardActionArea onClick={() => this.showAfghan()}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body1"
                    align="center"
                    style={{ whiteSpace: "pre-line", color: "#FFFFFF" }}
                  >
                    Documents Afghans
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    align="center"
                    dir="rtl"
                    style={{ whiteSpace: "pre-line", color: "#FFFFFF" }}
                  >
                    مدارک افغان
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4} key={"iranian"}>
            <Card
              style={{
                backgroundColor:
                  this.state.nationality === "Iranian"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main
              }}
            >
              <CardActionArea onClick={() => this.showIranian()}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body1"
                    align="center"
                    style={{ whiteSpace: "pre-line", color: "#FFFFFF" }}
                  >
                    Documents Iraniens
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    align="center"
                    dir="rtl"
                    style={{ whiteSpace: "pre-line", color: "#FFFFFF" }}
                  >
                    مدارک ایرانی
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          direction="row"
          justify="center"
          alignContent={"center"}
        >
          {Object.keys(OrderTypes).map(typeKey => {
            let type = OrderTypes[typeKey];
            if (
              type.nationality === this.state.nationality ||
              type.nationality === "BOTH"
            )
              return (
                <Grid item xs={12} sm={6} md={4} key={typeKey}>
                  <FeatureCard
                    Icon={type.details.icon}
                    color={type.details.color}
                    headline={type.details.headline}
                    frenchHeadline={type.details.frenchHeadline}
                    text={type.details.text}
                    frenchText={type.details.frenchText}
                    onClick={() => this.handleOpenDialog(type)}
                  />
                </Grid>
              );
            return "";
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
                code={this.state.type.code}
              />
            }
            handleClose={this.handleCloseDialog}
            open={this.state.openIdentityDialog}
          />
        )}
        {this.redirectToPayment()}
        {this.redirectToDevis()}
      </Fragment>
    );
  }
}

export default SnackbarWrapper(CreateOrder);

CreateOrder.propTypes = {
  selectCreateOrder: PropTypes.func,
  showSnackbar: PropTypes.func.isRequired
};
