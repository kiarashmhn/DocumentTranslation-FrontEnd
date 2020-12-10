import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function ListOrder(props) {
  const selectListOrder = props;
  console.log("insidee");
  useEffect(selectListOrder, [selectListOrder]);

  return <Fragment>salam</Fragment>;
}

ListOrder.propTypes = {
  selectListOrder: PropTypes.func.isRequired
};

export default withStyles(styles)(ListOrder);
