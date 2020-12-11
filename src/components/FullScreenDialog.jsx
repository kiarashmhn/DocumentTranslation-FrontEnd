import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import * as PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Clear";
import * as ColorPalette from "./ColorPalette";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    paddingTop: 64
  },
  orange: {
    background:
      "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)"
  }
};

export default class FullScreenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false
    };
  }

  render() {
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.handleClose}
          // color={"primary"}
          // aria-labelledby="form-dialog-title"
          style={styles.cardTitleWhite}
          fullWidth={true}
          maxWidth={"xl"}
        >
          <div style={{ paddingTop: 64 }}>
            <AppBar style={styles.orange}>
              <Toolbar>
                <IconButton
                  edge="start"
                  onClick={this.props.handleClose}
                  aria-label="close"
                >
                  <DeleteIcon
                    fontSize="small"
                    styles={{ color: ColorPalette.red }}
                  />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DialogContent>{this.props.component}</DialogContent>
          </div>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  component: PropTypes.any.isRequired
};
