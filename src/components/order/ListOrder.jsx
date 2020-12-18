import React, { Component, Fragment } from "react";
import CustomDialogs from "../CustomDialogs";
//import PropTypes from "prop-types";
import MUITable from "../Table/MUITable";
import * as URLConstant from "../../URLConstant";
import IconButton from "@material-ui/core/IconButton";
import Info from "@material-ui/icons/Info";
import * as ColorPalette from "../ColorPalette";
import EditViewOrder from "./EditViewOrder";

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.refElement = React.createRef();
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

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        name: "rowId",
        label: "شماره ردیف"
      },
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
        label: "عملیات",
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
    ];

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
          columns={columns}
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

ListOrder.propTypes = {};

export default ListOrder;
