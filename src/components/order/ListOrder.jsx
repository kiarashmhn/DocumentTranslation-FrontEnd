import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MUITable from "../Table/MUITable";
import * as URLConstant from "../../URLConstant";
import IconButton from "@material-ui/core/IconButton";
import Info from "@material-ui/icons/Info";
import * as ColorPalette from "../ColorPalette";
import EditViewOrder from "./EditViewOrder";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import Api from "../Api/Api";
import { withStyles } from "@material-ui/core";
import EditUserDialog from "../register_login/EditUserDialog";
import SelectAdminDialog from "../register_login/SelectAdminDialog";
import AuthService from "../../AuthService";
import FullScreenDialog from "../FullScreenDialog";
import { getFrench } from "./OrderStatus";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import theme from "../../theme";
import PaymentInfo from "../Payment/PaymentInfo";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ShowBill from "../Payment/ShowBill";

const styles = theme => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark
    }
  },
  emptyLink: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut
    }),
    cursor: "pointer",
    color: theme.palette.danger.main,
    "&:enabled:hover": {
      color: theme.palette.danger.main
    },
    "&:enabled:focus": {
      color: theme.palette.danger.main
    }
  }
});

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.refElement = React.createRef();
    this.api = new Api();
    this.state = {
      open: false,
      openUser: false,
      openAdmins: false,
      openPaymentInfo: false,
      openBillInfo: false,
      itemId: "",
      username: "",
      adminName: ""
    };
    this.auth = new AuthService();
  }

  componentDidMount() {
    this.setState({
      isAdmin: this.auth.isAdmin(),
      isSuperAdmin: this.auth.isSuperAdmin()
    });
  }

  getData = () => {
    this.refElement.current.reload();
  };

  handleClickOpen = itemId => {
    this.setState({
      open: true,
      itemId: itemId
    });
  };

  handleClickOpenAdmins = (itemId, adminName) => {
    this.setState({
      openAdmins: true,
      itemId: itemId,
      adminName: adminName
    });
  };

  handleClickCloseAdmins = () => {
    this.setState({
      openAdmins: false,
      itemId: "",
      adminName: ""
    });
    this.getData();
  };

  handleClickOpenUser = username => {
    this.setState({
      openUser: true,
      username: username
    });
  };

  handleClickCloseUser = () => {
    this.setState({
      openUser: false,
      username: ""
    });
  };

  handleClickOpenPayment = orderId => {
    this.setState({
      openPaymentInfo: true,
      itemId: orderId
    });
  };

  handleClickClosePayment = () => {
    this.setState({
      openPaymentInfo: false,
      itemId: ""
    });
    this.getData();
  };

  handleClickOpenBill = orderId => {
    this.setState({
      openBillInfo: true,
      itemId: orderId
    });
  };

  handleClickCloseBill = () => {
    this.setState({
      openBillInfo: false,
      itemId: ""
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.getData();
  };

  getColumns = () => {
    let columns = [
      {
        name: "identifier",
        label: "N° de commande"
      },
      {
        name: "id",
        label: "آیدی",
        options: {
          display: "excluded"
        }
      }
    ];

    if (this.props.type && this.state.isAdmin) {
      columns.push({
        name: "username",
        label: "Demandeur",
        options: {
          customBodyRender: value => {
            if (value !== undefined && value !== null) {
              return (
                <span
                  className={this.props.classes.link}
                  onClick={() => this.handleClickOpenUser(value)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={event => {
                    if (event.keyCode === 13 || event.keyCode === 32) {
                      this.handleClickOpenUser(value);
                    }
                  }}
                >
                  {value}
                </span>
              );
            }
          }
        }
      });
    }

    columns.push({
      name: "status",
      label: "État",
      options: {
        customBodyRender: value => {
          if (value !== undefined && value !== null) {
            return <span>{getFrench(value)}</span>;
          }
        }
      }
    });

    columns = [
      ...columns,
      ...[
        {
          name: "submitDate",
          label: "Date registre/paiement"
        },
        {
          name: "acceptanceDate",
          label: "Date d'acceptation"
        },
        {
          name: "deliveryDate",
          label: "Date de livraison"
        }
      ]
    ];
    if (this.props.type && this.state.isSuperAdmin)
      columns.push({
        name: "adminName",
        label: "Responsable",
        options: {
          customBodyRender: (value, meta) => {
            if (
              meta.rowData &&
              (meta.rowData[3] === "IN_PROGRESS" ||
                meta.rowData[3] === "PENDING")
            ) {
              if (value !== undefined && value !== null) {
                return (
                  <span
                    className={this.props.classes.link}
                    onClick={() =>
                      this.handleClickOpenAdmins(meta.rowData[1], value)
                    }
                    tabIndex={0}
                    role="button"
                    onKeyDown={event => {
                      if (event.keyCode === 13 || event.keyCode === 32) {
                        this.handleClickOpenAdmins(meta.rowData[1], value);
                      }
                    }}
                  >
                    {value}
                  </span>
                );
              } else {
                return (
                  <span
                    className={this.props.classes.emptyLink}
                    onClick={() =>
                      this.handleClickOpenAdmins(meta.rowData[1], null)
                    }
                    tabIndex={0}
                    role="button"
                    onKeyDown={event => {
                      if (event.keyCode === 13 || event.keyCode === 32) {
                        this.handleClickOpenAdmins(meta.rowData[1], null);
                      }
                    }}
                  >
                    À déterminer
                  </span>
                );
              }
            }
          }
        }
      });
    columns = [
      ...columns,
      ...[
        {
          name: "id",
          label: "Vue",
          options: {
            customBodyRender: (value, meta) => {
              if (value !== undefined && value !== null) {
                if (
                  (this.props.type && this.state.isAdmin) ||
                  (meta.rowData && meta.rowData[2] !== "PENDING")
                ) {
                  return (
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.handleClickOpen(value)}
                      style={{ color: ColorPalette.cornflowerblue }}
                    >
                      <Info fontSize="small" />
                    </IconButton>
                  );
                }
              }
            }
          }
        }
      ]
    ];
    if (this.props.type && this.state.isSuperAdmin)
      columns.push({
        name: "isPaid",
        label: "Info paiement",
        options: {
          customBodyRender: (value, meta) => {
            if (value !== undefined && value !== null && !!value) {
              return (
                <IconButton
                  aria-label="delete"
                  onClick={() => this.handleClickOpenPayment(meta.rowData[1])}
                  style={{ color: theme.palette.primary.main }}
                >
                  <MonetizationOnIcon fontSize="small" />
                </IconButton>
              );
            } else {
              return <span />;
            }
          }
        }
      });
    columns.push({
      name: "isPaymentVerified",
      label: "Facture",
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null && !!value) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => this.handleClickOpenBill(meta.rowData[1])}
                style={{ color: theme.palette.primary.main }}
              >
                <ReceiptIcon fontSize="small" />
              </IconButton>
            );
          } else {
            return <span />;
          }
        }
      }
    });
    return columns;
  };

  render() {
    const title = "Liste de commande";

    const url =
      process.env.REACT_APP_HOST_URL +
      process.env.REACT_APP_MAIN_PATH +
      URLConstant.GET_ORDERS;

    return (
      <Fragment>
        <MUITable
          dir={"rtl"}
          ref={this.refElement}
          columns={this.getColumns()}
          url={url}
          method={"Post"}
          title={title}
          additionalData={
            this.state.isSuperAdmin
              ? {}
              : this.state.isAdmin
              ? {
                  adminName: localStorage.getItem("username")
                }
              : {
                  username: localStorage.getItem("username")
                }
          }
        />
        <FullScreenDialog
          title="ویرایش سفارش"
          component={
            <EditViewOrder
              itemId={parseInt(this.state.itemId)}
              type={this.props.type}
            />
          }
          handleClose={this.handleClose}
          open={this.state.open}
          itemId={this.state.itemId}
        />
        {this.state.openUser && (
          <EditUserDialog
            name={this.state.username}
            onClose={this.handleClickCloseUser}
          />
        )}
        {this.state.openAdmins && (
          <SelectAdminDialog
            adminName={this.state.adminName}
            itemId={this.state.itemId}
            onClose={this.handleClickCloseAdmins}
          />
        )}
        {this.state.openPaymentInfo && (
          <PaymentInfo
            orderId={this.state.itemId}
            onClose={this.handleClickClosePayment}
          />
        )}
        <FullScreenDialog
          title="Facture"
          component={<ShowBill orderId={this.state.itemId} />}
          handleClose={this.handleClickCloseBill}
          open={this.state.openBillInfo}
          itemId={this.state.itemId}
        />
      </Fragment>
    );
  }
}

ListOrder.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default SnackbarWrapper(
  withStyles(styles, { withTheme: true })(ListOrder)
);
