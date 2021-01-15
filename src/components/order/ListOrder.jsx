import React, { Component, Fragment } from "react";
import CustomDialogs from "../CustomDialogs";
import PropTypes from "prop-types";
import MUITable from "../Table/MUITable";
import * as URLConstant from "../../URLConstant";
import IconButton from "@material-ui/core/IconButton";
import Info from "@material-ui/icons/Info";
import * as ColorPalette from "../ColorPalette";
import EditViewOrder from "./EditViewOrder";
import ProgressibleButton from "../Progress/ProgressibleButton";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import Api from "../Api/Api";
import { withStyles } from "@material-ui/core";
import EditUserDialog from "../register_login/EditUserDialog";

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
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark
    }
  }
});

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.refElement = React.createRef();
    this.progressElementRef = {};
    this.api = new Api();
    this.state = {
      open: false,
      openUser: false,
      itemId: "",
      username: ""
    };
  }

  getData = () => {
    this.refElement.current.getData();
  };

  handleClickOpen = itemId => {
    this.setState({
      open: true,
      itemId: itemId
    });
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

  claim = itemId => {
    let self = this;
    let postData = {
      orderId: itemId
    };
    this.api
      .doPost(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CLAIM_ORDER,
        postData
      )
      .then(function(res) {
        self.props.showSnackbar(res.message, res.success ? "success" : "error");
        self.progressElementRef[itemId].setLoding(false);
        self.getData();
      })
      .catch(function() {
        self.progressElementRef[itemId].setLoding(false);
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getColumns = () => {
    let columns = [
      {
        name: "rowId",
        label: "شماره ردیف"
      }
    ];

    if (this.props.type && this.props.type === "ADMIN")
      columns.push({
        name: "username",
        label: "درخواست دهنده",
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
                    // For screenreaders listen to space and enter events
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
          name: "type",
          label: "نوع سفارش"
        },
        {
          name: "id",
          label: "شناسه سفارش"
        },
        {
          name: "status",
          label: "وضعیت سفارش"
        },
        {
          name: "creationTime",
          label: "تاریخ ثبت"
        },
        {
          name: "id",
          label: "مشاهده",
          options: {
            customBodyRender: (value, meta) => {
              if (value !== undefined && value !== null) {
                if (
                  (this.props.type && this.props.type === "ADMIN") ||
                  (meta.rowData && meta.rowData[3] !== "درحال انجام/En cours")
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
        name: "id",
        label: "پذیرش",
        options: {
          customBodyRender: (value, meta) => {
            if (
              value !== undefined &&
              value !== null &&
              meta.rowData &&
              meta.rowData[4] ===
                "در انتظار پذیرش توسط مسئول ترجمه/En attente d'acceptation"
            ) {
              return (
                <ProgressibleButton
                  key={value}
                  ref={ref => {
                    this.progressElementRef[value] = ref;
                  }}
                  passedFunction={() => this.claim(value)}
                  icon={"CheckCircle"}
                  color={ColorPalette.lightseagreen}
                />
              );
            }
          }
        }
      });
    return columns;
  };

  render() {
    const title = "لیست سفارش ها";

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
