import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import * as PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class CustomDialogs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"xl"}
        TransitionComponent={Transition}
      >
        <DialogActions>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={this.props.handleClose}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </DialogActions>

        <DialogContent>{this.props.open && this.props.component}</DialogContent>
      </Dialog>
    );
  }
}

CustomDialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  component: PropTypes.any.isRequired
};
