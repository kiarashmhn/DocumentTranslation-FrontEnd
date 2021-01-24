import React, { Component, Fragment } from "react";
import CustomDialogs from "../CustomDialogs";
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
      itemId: "",
      username: "",
      adminName: ""
    };
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

    if (this.props.type && this.props.type === "ADMIN")
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

    columns = [
      ...columns,
      ...[
        {
          name: "status",
          label: "État"
        },
        {
          name: "creationTime",
          label: "Date d'enregistrement"
        },
        {
          name: "id",
          label: "Vue",
          options: {
            customBodyRender: (value, meta) => {
              if (value !== undefined && value !== null) {
                if (
                  (this.props.type && this.props.type === "ADMIN") ||
                  (meta.rowData && meta.rowData[2] !== "En cours")
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
    if (this.props.type && this.props.type === "ADMIN")
      columns.push({
        name: "adminName",
        label: "Responsable",
        options: {
          customBodyRender: (value, meta) => {
            if (
              meta.rowData &&
              (meta.rowData[3] === "En attente d'acceptation" ||
                meta.rowData[3] === "En cours")
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
                    pas de responsables
                  </span>
                );
              }
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
            this.props.type === "ADMIN"
              ? {}
              : {
                  username: localStorage.getItem("username")
                }
          }
        />
        <CustomDialogs
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
