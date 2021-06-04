import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import FormDialog from "../Template/FormDialog";
import PropTypes from "prop-types";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";

class DeleteExpiredOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ids: []
    };
    this.api = new Api();
  }

  componentDidMount() {
    this.getExpiredOrders();
  }

  getExpiredOrders = async () => {
    let self = this;
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_EXPIRED_ORDERS,
        {}
      )
      .then(function(res) {
        if (!res.success) self.props.showSnackbar(res.message, "error");
        else self.setState({ ids: res.data });
      });
  };

  deleteOrders = async () => {
    let self = this;
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.DELETE_EXPIRED_ORDERS,
        {}
      )
      .then(function(res) {
        if (!res.success) self.props.showSnackbar(res.message, "error");
      });
  };

  submit = () => {
    this.setState({ loading: true }, () =>
      this.deleteOrders().then(() => {
        this.setState({ loading: false }, () => {
          this.props.onClose();
        });
      })
    );
  };

  render() {
    return (
      <FormDialog
        open
        loading={this.state.loading}
        onClose={this.props.onClose}
        hideBackdrop={false}
        onFormSubmit={e => {
          e.preventDefault();
        }}
        hasCloseIcon
        content={
          this.state.ids.length >= 1 ? (
            <div>
              <Typography align={"center"}>
                <div>
                  {"Êtes-vous sûr de vouloir supprimer ces commandes ?"}
                </div>
                <div dir={"rtl"}>
                  {"آیا از حذف این سفارش ها اطمینان دارید؟"}
                </div>
                {this.state.ids.map(i => (
                  <div key={i + "key"}>{i}</div>
                ))}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography align={"center"}>
                <div>{"Il n'y a pas de coutume à supprimer"}</div>
                <div dir={"rtl"}>{"سفارشی برای حذف وجود ندارد"}</div>
              </Typography>
            </div>
          )
        }
        actions={
          <div>
            <Button
              fullWidth
              onClick={this.props.onClose}
              variant="contained"
              size="large"
              color="secondary"
              style={{ textTransform: "none", align: "center" }}
              disabled={this.state.loading}
            >
              Annuler / انصراف
              {this.state.loading && <ButtonCircularProgress />}
            </Button>
            {this.state.ids.length >= 1 && (
              <Button
                onClick={this.submit}
                fullWidth
                variant="contained"
                size="large"
                style={{
                  marginTop: "10px",
                  textTransform: "none",
                  align: "center"
                }}
                disabled={this.state.loading}
              >
                Confirmer / تایید
                {this.state.loading && <ButtonCircularProgress />}
              </Button>
            )}
          </div>
        }
      />
    );
  }
}
export default SnackbarWrapper(DeleteExpiredOrders);
DeleteExpiredOrders.propTypes = {
  onClose: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired
};
