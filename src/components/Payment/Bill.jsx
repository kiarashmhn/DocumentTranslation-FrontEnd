import React, { Component } from "react";
import theme from "../../theme";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as PropTypes from "prop-types";

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

export default class Bill extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Typography gutterBottom variant="h4" component="h4" align="center">
          FACTURE
        </Typography>
        <Typography
          variant="body1"
          component={"div"}
          style={{ whiteSpace: "pre-line", marginTop: theme.spacing(2) }}
        >
          {info}
        </Typography>
        <Typography variant="body1">
          <Box fontStyle="bold" fontWeight="fontWeightMedium" display="inline">
            {orderInfo.name + " " + orderInfo.lastName}
          </Box>
          <br />
        </Typography>
        <Typography>Emise à Caen, le 24/01/2021</Typography>
        <Typography>
          {"Facture n°" + this.props.code + this.props.orderId}
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Désignation des prestations</TableCell>
                <TableCell align="right">Prix unitaire</TableCell>
                <TableCell align="right">Quantité</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={orderInfo.name}>
                <TableCell component="th" scope="row">
                  {"Traduction " + typeInfo.name}
                </TableCell>
                <TableCell align="right">
                  {this.props.amount + " euros"}
                </TableCell>
                <TableCell align="right">{1}</TableCell>
                <TableCell align="right">
                  {this.props.amount + " euros"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography>
          {"La facture a été payée par " + methodInfo.name}
        </Typography>
      </div>
    );
  }
}

Bill.propTypes = {
  amount: PropTypes.any.isRequired,
  orderId: PropTypes.any.isRequired,
  code: PropTypes.any.isRequired,
  method: PropTypes.any.isRequired
};
