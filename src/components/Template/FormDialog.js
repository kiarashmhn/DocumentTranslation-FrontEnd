import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  Box,
  withStyles,
  Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import DialogActions from "@material-ui/core/DialogActions";

const styles = theme => ({
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
    maxWidth: 500
  },
  actions: {
    marginTop: theme.spacing(2)
  },
  dialogPaperScrollPaper: {
    overflow: "scroll"
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%"
  }
});

/**
 * A Wrapper around the Dialog component to create centered
 * Login, Register or other Dialogs.
 */
function FormDialog(props) {
  const {
    classes,
    open,
    onClose,
    loading,
    headline,
    onFormSubmit,
    content,
    actions,
    hideBackdrop,
    frenchHeadline
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      scroll={"paper"}
      classes={{
        paper: classes.dialogPaper,
        paperScrollPaper: classes.dialogPaperScrollPaper
      }}
      hideBackdrop={hideBackdrop ? hideBackdrop : false}
    >
      <DialogActions style={{ position: "relative", left: "43%" }}>
        <IconButton aria-label="delete" color="secondary" onClick={onClose}>
          <DeleteIcon />
        </IconButton>
      </DialogActions>
      {(frenchHeadline || headline) && (
        <div style={{ position: "relative", top: "80%" }}>
          {frenchHeadline && (
            <Typography variant="h6" align={"center"}>
              {frenchHeadline}
            </Typography>
          )}
          {headline && (
            <Typography variant="h6" align={"center"}>
              {headline}
            </Typography>
          )}
        </div>
      )}
      <DialogContent className={classes.dialogContent}>
        <form onSubmit={onFormSubmit} autoComplete="new-password">
          <div style={{ width: "100%" }}>{content}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Box width="80%" className={classes.actions}>
              {actions}
            </Box>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  headline: PropTypes.string,
  frenchHeadline: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  content: PropTypes.element.isRequired,
  actions: PropTypes.element.isRequired,
  hideBackdrop: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(FormDialog);
