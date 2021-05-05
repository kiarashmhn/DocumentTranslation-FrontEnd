import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MUITable from "../Table/MUITable";
import * as URLConstant from "../../URLConstant";
import EditViewOrder from "./EditViewOrder";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import Api from "../Api/Api";
import EditUserDialog from "../register_login/EditUserDialog";
import SelectAdminDialog from "../register_login/SelectAdminDialog";
import AuthService from "../../AuthService";
import FullScreenDialog from "../FullScreenDialog";
import PaymentInfo from "../Payment/PaymentInfo";
import ShowBill from "../Payment/ShowBill";
import {
  getAdminColumns,
  getSuperAdminColumns,
  getUserColumns
} from "./ListOrderColumns";
import ChatBox from "../Chat/ChatBox";

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
      openMessages: false,
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

  handleClickOpenMessages = orderId => {
    this.setState({
      openMessages: true,
      itemId: orderId
    });
  };

  handleClickCloseMessages = () => {
    this.setState({
      openMessages: false,
      itemId: ""
    });
    this.getData();
  };

  handleClose = () => {
    this.setState({ open: false });
    this.getData();
  };

  getColumns = () => {
    if (this.props.type && this.state.isSuperAdmin)
      return getSuperAdminColumns(
        this.handleClickOpenUser,
        this.handleClickOpen,
        this.handleClickOpenBill,
        this.handleClickOpenAdmins,
        this.handleClickOpenPayment,
        this.handleClickOpenMessages
      );
    if (this.props.type && this.state.isAdmin)
      return getAdminColumns(
        this.handleClickOpen,
        this.handleClickOpenBill,
        this.handleClickOpenMessages
      );
    return getUserColumns(
      this.handleClickOpen,
      this.handleClickOpenBill,
      this.handleClickOpenMessages
    );
  };

  render() {
    const title = "Liste de commande / لیست سفارش‌ها";

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
          filter={{
            componentTitle: title,
            staticData: [
              {
                key: "identifier",
                type: "text",
                grid: 12,
                notRequired: true
              }
            ]
          }}
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
        {this.state.openMessages && (
          <ChatBox
            orderId={this.state.itemId}
            onClose={this.handleClickCloseMessages}
            type={this.state.isSuperAdmin ? "ADMIN" : "USER"}
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
  type: PropTypes.string
};

export default SnackbarWrapper(ListOrder);
