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

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.refElement = React.createRef();
    this.progressElementRef = {};
    this.state = {
      open: false,
      itemId: ""
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

  claim = itemId => {
    let self = this;
    let postData = {
      id: itemId
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
      columns.push({ name: "username", label: "درخواست دهنده" });

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
            customBodyRender: value => {
              if (value !== undefined && value !== null) {
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
              meta.rowData[3] ===
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
          additionalData={{
            username: localStorage.getItem("username")
          }}
        />
        <CustomDialogs
          title="ویرایش سفارش"
          component={<EditViewOrder itemId={parseInt(this.state.itemId)} />}
          handleClose={this.handleClose}
          open={this.state.open}
          itemId={this.state.itemId}
        />
      </Fragment>
    );
  }
}

ListOrder.propTypes = {
  type: PropTypes.string
};

export default SnackbarWrapper(ListOrder);
