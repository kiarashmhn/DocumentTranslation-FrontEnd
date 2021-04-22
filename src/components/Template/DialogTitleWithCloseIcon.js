import React from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  DialogTitle,
  Typography,
  Box,
  withTheme
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function DialogTitleWithCloseIcon(props) {
  const {
    theme,
    paddingBottom,
    onClose,
    disabled,
    title,
    disablePadding,
    frenchTitle
  } = props;
  return (
    <DialogTitle
      style={{
        paddingBottom: paddingBottom
          ? paddingBottom && disablePadding
            ? 0
            : paddingBottom
          : theme.spacing(3),
        paddingLeft: disablePadding ? 0 : null,
        paddingRight: disablePadding ? 0 : null,
        paddingTop: disablePadding ? 0 : theme.spacing(2),
        width: "100%"
      }}
      disableTypography
    >
      <Box display="flex">
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          {frenchTitle && <Typography variant="h5">{frenchTitle}</Typography>}
          <Typography variant="h5">{title}</Typography>
        </div>
        <div>
          <IconButton
            onClick={onClose}
            style={{ marginTop: -5 }}
            disabled={disabled}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Box>
    </DialogTitle>
  );
}

DialogTitleWithCloseIcon.propTypes = {
  theme: PropTypes.object,
  paddingBottom: PropTypes.number,
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  frenchTitle: PropTypes.string,
  disablePadding: PropTypes.bool
};

export default withTheme(DialogTitleWithCloseIcon);
