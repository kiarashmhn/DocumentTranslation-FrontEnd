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

const info =
  "Service de traduction certifiée\n" +
  "Tél : 06 34 39 71 56\n" +
  "Courriel : francedoc.fr@gmail.com\n" +
  "N° SIRET 89031756300017\n";

const orderInfo = {
  type: "",
  name: "Ebrahim",
  lastName: "ASSADI",
  address: "Tehran, Iran"
};

const methodInfo = {
  name: "virement bancaire"
};

const typeInfo = {
  name: "Permis de conduire"
};

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

export default class Bill extends Component {
  constructor(props) {
    super(props);
  }
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
          component="h5"
          align="center"
          style={{ marginTop: "10px" }}
        >
          <Box fontStyle="bold" fontWeight="fontWeightMedium" display="inline">
            FACTURE
          </Box>
        </Typography>
        <Typography
          variant="body1"
          style={{ marginTop: "10px" }}
          align={"center"}
        >
          <Box fontStyle="bold" fontWeight="fontWeightMedium" display="inline">
            {orderInfo.name + " " + orderInfo.lastName}
          </Box>
          <br />
        </Typography>
        <Typography variant="body1" align={"center"}>
          {orderInfo.address}
        </Typography>
        <br />
        <div style={{ padding: "30px 30px" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Désignation des prestations</StyledTableCell>
                  <StyledTableCell align="center">
                    Prix unitaire
                  </StyledTableCell>
                  <StyledTableCell align="center">Quantité</StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key={orderInfo.name}>
                  <StyledTableCell component="th" scope="row">
                    {"Traduction " + typeInfo.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {this.props.amount + " euros"}
                  </StyledTableCell>
                  <StyledTableCell align="center">{1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {this.props.amount + " euros"}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
          <Typography>{"Facture n°" + this.props.orderId}</Typography>
          <Typography>
            {"La facture a été payée par " + methodInfo.name}
          </Typography>
          <br />
          <Divider style={{ margin: "4px 2px" }} />
          <Typography>
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

Bill.propTypes = {
  amount: PropTypes.any.isRequired,
  orderId: PropTypes.any.isRequired,
  method: PropTypes.any.isRequired
};