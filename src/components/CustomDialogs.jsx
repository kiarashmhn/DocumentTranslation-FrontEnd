import React, { Component } from "react";

import { Dialog, withStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import * as PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import theme from "../theme";
import Divider from "@material-ui/core/Divider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(1),
    minHeight: "80vh",
    maxHeight: "80vh"
  },
  actions: {
    marginTop: theme.spacing(2)
  },
  dialogPaperScrollPaper: {
    overflow: "scroll"
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

class CustomDialogs extends Component {
  constructor(props) {
    super(props);
    this.lastRef = React.createRef();
  }

  componentDidMount() {
    //console.log(this.lastRef);
    /*this.lastRef.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });*/
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        scroll={"paper"}
        classes={{
          paper: this.props.classes.dialogPaper,
          paperScrollPaper: this.props.classes.dialogPaperScrollPaper
        }}
        hideBackdrop={this.props.hideBackdrop ? this.props.hideBackdrop : false}
        fullWidth
        maxWidth="xs"
      >
        <DialogActions style={{ position: "relative", left: "43%" }}>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={this.props.onClose}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </DialogActions>

        <DialogContent style={{ width: "100%" }}>
          <DialogContent>{this.props.open && this.props.content}</DialogContent>
          <div
            ref={node => {
              this.lastRef = node;
            }}
          />
        </DialogContent>
        <Divider
          style={{
            margin: `4px 0px`
          }}
        />
        {this.props.actions && (
          <Box width="90%" style={{ marginTop: theme.spacing(2) }}>
            {this.props.actions}
          </Box>
        )}
      </Dialog>
    );
  }
}

CustomDialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.any.isRequired,
  actions: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  hideBackdrop: PropTypes.bool.isRequired
};
export default withStyles(styles, { withTheme: true })(CustomDialogs);
