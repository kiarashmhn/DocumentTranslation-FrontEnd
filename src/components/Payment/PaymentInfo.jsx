import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";
import Grid from "@material-ui/core/Grid";
import CustomFileDownload from "../File/CustomFileDownload";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { methods } from "./MethodsInfo";
import { getFrenchName, getPersianName } from "../../Dictionary";
import FormDialog from "../Template/FormDialog";
import { Button, Typography } from "@material-ui/core";

export default class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      payments: [],
      isLoading: true
    };
    this.api = new Api();
  }

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      this.getDocuments().then(
        await this.getPayments().then(() => {
          this.setState({ isLoading: false });
        })
      );
    });
  }

  getPayments = async () => {
    let self = this;
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_PAYMENTS,
        {
          orderId: this.props.orderId
        }
      )
      .then(function(res) {
        if (res.success) {
          self.setState({
            payments: res.data
          });
        }
      });
  };

  getDocuments = async () => {
    if (this.props.orderId) {
      let self = this;
      let postData = {
        orderId: this.props.orderId,
        type: "payment"
      };
      await this.api
        .doPostNoAppend(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.GET_DOCUMENTS,
          postData
        )
        .then(function(res) {
          if (res.success) {
            self.setState({
              files: res.data
            });
          }
        });
    }
  };

  verifyPayment = async () => {
    if (this.props.orderId) {
      let self = this;
      let postData = {
        orderId: this.props.orderId
      };
      await this.api
        .doPostNoAppend(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.VERIFY_PAYMENT,
          postData
        )
        .then(function(res) {
          if (res.success) {
            self.props.onClose();
          }
        });
    }
  };

  getFilesView = () => {
    if (this.state.files && this.state.files.length > 0)
      return (
        <Fragment>
          <Grid container spacing={2} justify="center">
            {this.state.files.map((file, index) => {
              return (
                <Grid item xs={8} sm={4} align="center" key={file.name + index}>
                  <CustomFileDownload id={file.id} name={file.name} />
                </Grid>
              );
            })}
          </Grid>
        </Fragment>
      );
  };

  getPaymentsView = () => {
    if (this.state.payments && this.state.payments.length > 0) {
      return (
        <div style={{ padding: "20px 20px" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Moyen de paiement</TableCell>
                  <TableCell align="center">Montant</TableCell>
                  <TableCell align="center">Mode de livraison</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Référence</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.payments.map((p, idx) => {
                  return (
                    <TableRow key={"payment" + idx}>
                      <TableCell>{methods[p.method].frenchTitle}</TableCell>
                      <TableCell align="center">
                        {p.amount + " euros"}
                      </TableCell>
                      <TableCell align="center">
                        {p.deliveryType === 2
                          ? getFrenchName("specialPost")
                          : p.deliveryType === 1
                          ? getFrenchName("post")
                          : getFrenchName("normalPost")}
                      </TableCell>
                      <TableCell align="center">
                        {(new Date(p.creationTime).getDate() < 10
                          ? "0" + new Date(p.creationTime).getDate()
                          : new Date(p.creationTime).getDate()) +
                          "/" +
                          (new Date(p.creationTime).getMonth() + 1 < 10
                            ? "0" + (new Date(p.creationTime).getMonth() + 1)
                            : new Date(p.creationTime).getMonth() + 1) +
                          "/" +
                          new Date(p.creationTime).getFullYear()}
                      </TableCell>
                      <TableCell align={"center"}>{p.code}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  };

  render() {
    return (
      <FormDialog
        loading={this.state.isLoading}
        onClose={this.props.onClose}
        open
        headline="Informations de paiement"
        onFormSubmit={e => {
          e.preventDefault();
        }}
        hideBackdrop
        hasCloseIcon
        content={
          <Fragment>
            {this.getFilesView()}
            {this.getPaymentsView()}
          </Fragment>
        }
        actions={
          <div
            style={{
              maxWidth: "100%",
              verticalAlign: "middle",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              paddingBottom: "20px",
              marginTop: "5px"
            }}
          >
            <Button
              onClick={this.verifyPayment}
              style={{ textTransform: "none" }}
              variant="contained"
              color="secondary"
              align={"center"}
            >
              <p>
                <span
                  style={{
                    display: "block",
                    marginBottom: "0",
                    fontSize: 16
                  }}
                />
                <Typography variant="body1" align="center" component={"span"}>
                  {getFrenchName("finalSubmit")}
                </Typography>
                <span
                  style={{
                    display: "block",
                    marginBottom: "2px",
                    fontSize: "100%"
                  }}
                />
                <Typography variant="body1" align="center" component={"span"}>
                  {getPersianName("finalSubmit")}
                </Typography>
              </p>
            </Button>
          </div>
        }
      />
    );
  }
}
PaymentInfo.propTypes = {
  orderId: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired
};
