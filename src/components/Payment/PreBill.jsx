import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import theme, { grayColor } from "../../theme";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";

const info =
  "Service de traduction certifiée\n" +
  "Tél : 06 34 39 71 56\n" +
  "Courriel : francedoc.fr@gmail.com\n" +
  "N° SIRET 89031756300017\n";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  body: {
    backgroundColor: grayColor[4],
    fontSize: 15
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export default class PreBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      address: "",
      delay: 0,
      amount: 0
    };
    this.api = new Api();
  }

  componentDidMount() {
    this.getOrder();
  }

  getOrder = async () => {
    let self = this;
    let postData = {
      id: this.props.orderId
    };
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_ORDER_BY_ID,
        postData
      )
      .then(function(res) {
        if (!res.success) self.props.showSnackbar(res.message, "error");
        else {
          self.setState({
            address: res.data.details ? res.data.details.address : "",
            username: res.data.username,
            amount: res.data.preBillAmount,
            delay: res.data.preBillDelay
          });
        }
      });
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              cursor: "pointer",
              display: "block",
              backgroundRepeat: "no-repeat",
              verticalAlign: "middle",
              borderRadius: theme.shape.borderRadius,
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/logged_out/logo.png)`,
              backgroundSize: "contain",
              height: "60px",
              width: "240px"
            }}
          />
        </div>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          align="center"
          style={{ marginTop: "10px" }}
        >
          <Box fontStyle="bold" fontWeight="fontWeightMedium" display="inline">
            DEVIS
          </Box>
        </Typography>
        <Typography
          variant="body1"
          style={{ marginTop: "10px" }}
          align={"center"}
          component="div"
        >
          <Box fontStyle="bold" fontWeight="fontWeightMedium" display="inline">
            {this.state.username}
          </Box>
          <br />
        </Typography>
        <Typography variant="body1" align={"center"}>
          {this.state.address}
        </Typography>
        <div style={{ padding: "20px 20px" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Désignation des prestations</StyledTableCell>
                  <StyledTableCell align="center">
                    Prix unitaire*
                  </StyledTableCell>
                  <StyledTableCell align="center">Quantité</StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key={"DD"}>
                  <StyledTableCell component="th" scope="row">
                    {"Traduction certifiée dari/farsi↔ français"}
                    <br />
                    <div>
                      {"Délai de réalisation : " +
                        this.state.delay +
                        " heures après réception de votre règlement"}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {this.state.amount + " euros TTC"}
                  </StyledTableCell>
                  <StyledTableCell align="center">{1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {this.state.amount + " euros"}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography>*TVA non applicable, art. 293 B du CGI</Typography>
          <br />
          <Typography>
            {"Emise à Caen, le " +
              (new Date().getDate() < 10
                ? "0" + new Date().getDate()
                : new Date().getDate()) +
              "/" +
              (new Date().getMonth() + 1 < 10
                ? "0" + (new Date().getMonth() + 1)
                : new Date().getMonth() + 1) +
              "/" +
              new Date().getFullYear()}
          </Typography>
          <Typography>{"Affaire : " + "DD" + this.props.orderId}</Typography>
          <Divider style={{ margin: "4px 2px" }} />
          <Typography component="div">
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              francedoc.fr
            </Box>
          </Typography>
          <Typography component={"div"} style={{ whiteSpace: "pre-line" }}>
            {info}
          </Typography>
        </div>
      </div>
    );
  }
}

PreBill.propTypes = {
  orderId: PropTypes.any.isRequired
};
