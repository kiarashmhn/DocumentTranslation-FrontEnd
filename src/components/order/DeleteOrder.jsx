import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import FormDialog from "../Template/FormDialog";
import PropTypes from "prop-types";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";

class DeleteOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.api = new Api();
  }

  deleteOrder = async () => {
    let self = this;
    let postData = {
      id: this.props.id
    };
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.ORDER_DELETE,
        postData
      )
      .then(function(res) {
        if (!res.success) self.props.showSnackbar(res.message, "error");
      });
  };

  submit = () => {
    this.setState({ loading: true }, () =>
      this.deleteOrder().then(() => {
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
          this.submit();
        }}
        hasCloseIcon
        content={
          <div>
            <Typography align={"center"}>
              <div>
                {"Êtes-vous sûr de vouloir supprimer la commande? (" +
                  this.props.name +
                  ")"}
              </div>
              <div dir={"rtl"}>
                {"آیا از حذف سفارش اطمینان دارید؟ " +
                  "(" +
                  this.props.name +
                  ")"}
              </div>
            </Typography>
          </div>
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
            <Button
              type="submit"
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
          </div>
        }
      />
    );
  }
}
export default SnackbarWrapper(DeleteOrder);
DeleteOrder.propTypes = {
  onClose: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  name: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired
};
