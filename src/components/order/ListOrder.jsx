import React, { Component } from "react";
//import PropTypes from "prop-types";
import MUITable from "../../custom/Table/MUITable";
import * as URLConstant from "../../URLConstant";

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.refElement = React.createRef();
  }

  getData = () => {
    this.refElement.current.getData();
  };

  render() {
    const columns = [
      {
        name: "rowId",
        label: "شماره ردیف"
      },
      {
        name: "username",
        label: "نام کاربری مشتری"
      },
      {
        name: "Id",
        label: "شناسه سفارش"
      },
      {
        name: "status",
        label: "وضعیت سفارش"
      },
      {
        name: "type",
        label: "نوع سفارش"
      },
      {
        name: "creationTime",
        label: "تاریخ ثبت"
      }
    ];

    const title = "لیست سفارش ها";

    const url =
      process.env.REACT_APP_HOST_URL +
      process.env.REACT_APP_MAIN_PATH +
      URLConstant.GET_ORDERS;

    return (
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
    );
  }
}

ListOrder.propTypes = {};

export default ListOrder;
