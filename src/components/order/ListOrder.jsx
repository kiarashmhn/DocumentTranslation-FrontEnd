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
import OrderStatusDialog from "../register_login/OrderStatusDialog";
import DoneOrder from "./DoneOrder";
import DeleteOrder from "./DeleteOrder";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import IconButton from "@material-ui/core/IconButton";
import DeleteExpiredOrders from "./DeleteExpiredOrders";
import CreatePreBill from "../Payment/CreatePreBill";
import ShowPreBill from "../Payment/ShowPreBill";

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
      openStatus: false,
      openResult: false,
      openDelete: false,
      openDeletes: false,
      openCreatePreBill: false,
      openPreBill: false,
      itemId: "",
      name: "",
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

  handleClickOpenStatus = orderId => {
    this.setState({
      openStatus: true,
      itemId: orderId
    });
  };

  handleClickCloseStatus = () => {
    this.setState({
      openStatus: false,
      itemId: ""
    });
  };

  handleClickOpenResult = orderId => {
    this.setState({
      openResult: true,
      itemId: orderId
    });
  };

  handleClickCloseResult = () => {
    this.setState({
      openResult: false,
      itemId: ""
    });
    this.getData();
  };

  handleClickDelete = (orderId, name) => {
    this.setState({
      openDelete: true,
      itemId: orderId,
      name: name
    });
  };

  handleClickCloseDelete = () => {
    this.setState({
      openDelete: false,
      itemId: "",
      name: ""
    });
    this.getData();
  };

  handleClickDeletes = () => {
    this.setState({
      openDeletes: true
    });
  };

  handleClickCloseDeletes = () => {
    this.setState({
      openDeletes: false
    });
    this.getData();
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

  handleClickOpenCreatePreBill = orderId => {
    this.setState({
      openCreatePreBill: true,
      itemId: orderId
    });
  };

  handleClickCloseCreatePreBill = () => {
    this.setState({
      openCreatePreBill: false,
      itemId: ""
    });
    this.getData();
  };

  handleClickOpenPreBill = orderId => {
    this.setState({
      openPreBill: true,
      itemId: orderId
    });
  };

  handleClickClosePreBill = () => {
    this.setState({
      openPreBill: false,
      itemId: ""
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.getData();
  };

  handleDownload = id => {
    let self = this;
    this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_DOCUMENT_,
        { id: id }
      )
      .then(function(res) {
        if (res.success)
          self.api.getFile(
            process.env.REACT_APP_HOST_URL +
              process.env.REACT_APP_MAIN_PATH +
              URLConstant.GET_DOCUMENT,
            id,
            res.data.name
          );
      });
  };

  getColumns = () => {
    if (this.props.type && this.state.isSuperAdmin)
      return getSuperAdminColumns(
        this.handleClickOpenUser,
        this.handleClickOpen,
        this.handleClickOpenAdmins,
        this.handleClickOpenPayment,
        this.handleClickOpenMessages,
        this.handleClickOpenStatus,
        this.handleClickOpenResult,
        this.handleDownload,
        this.handleClickDelete,
        this.handleClickOpenCreatePreBill
      );
    if (this.props.type && this.state.isAdmin)
      return getAdminColumns(
        this.handleClickOpen,
        this.handleClickOpenMessages,
        this.handleClickOpenStatus,
        this.handleClickOpenResult,
        this.handleDownload
      );
    return getUserColumns(
      this.handleClickOpen,
      this.handleClickOpenBill,
      this.handleClickOpenMessages,
      this.handleClickOpenStatus,
      this.handleDownload,
      this.handleClickDelete,
      this.handleClickOpenPreBill
    );
  };

  render() {
    const title = "Liste des commandes / لیست سفارش‌ها";

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
            staticData: this.state.isAdmin
              ? [
                  {
                    key: "identifier",
                    type: "text",
                    grid: 12,
                    notRequired: true
                  },
                  {
                    key: "username",
                    type: "text",
                    grid: 12,
                    notRequired: true
                  }
                ]
              : [
                  {
                    key: "identifier",
                    type: "text",
                    grid: 12,
                    notRequired: true
                  }
                ]
          }}
          otherOptions={
            this.state.isSuperAdmin ? (
              <IconButton
                aria-label="delete"
                onClick={this.handleClickDeletes}
                style={{ color: "#e53935" }}
              >
                <DeleteSweepIcon fontSize="small" />
              </IconButton>
            ) : null
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
        {this.state.openStatus && (
          <OrderStatusDialog
            orderId={parseInt(this.state.itemId)}
            onClose={this.handleClickCloseStatus}
          />
        )}
        {this.state.openResult && (
          <DoneOrder
            orderId={parseInt(this.state.itemId)}
            onClose={this.handleClickCloseResult}
          />
        )}
        {this.state.openCreatePreBill && (
          <CreatePreBill
            orderId={parseInt(this.state.itemId)}
            onClose={this.handleClickCloseCreatePreBill}
          />
        )}
        {this.state.openDelete && (
          <DeleteOrder
            id={parseInt(this.state.itemId)}
            name={this.state.name}
            onClose={this.handleClickCloseDelete}
          />
        )}
        {this.state.openDeletes && (
          <DeleteExpiredOrders onClose={this.handleClickCloseDeletes} />
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
        <FullScreenDialog
          title="Devis"
          component={<ShowPreBill orderId={this.state.itemId} />}
          handleClose={this.handleClickClosePreBill}
          open={this.state.openPreBill}
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
