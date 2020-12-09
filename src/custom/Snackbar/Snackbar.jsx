import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";

import Grow from "@material-ui/core/Grow";

import { useDispatch, useSelector } from "react-redux";

import { destroySnackbar } from "./SnackbarActions";

import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider
} from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginLeft: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "-8px",
    paddingRight: "5px"
  }
}));

const style = {
  message: {
    fontFamily: "MyFont",
    display: "flex",
    direction: "rtl",
    alignItems: "right"
  }
};

const getMuiTheme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        fontFamily: "MyFont"
      }
    },
    MuiSnackbarContent: {
      action: {
        marginRight: "auto",
        marginLeft: "-8px",
        paddingRight: "0"
      }
    }
  }
});

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <MuiThemeProvider theme={getMuiTheme}>
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" style={style.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            href={""}
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    </MuiThemeProvider>
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

function GrowTransition(props) {
  return <Grow {...props} />;
}

function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { message, open, variant } = useSelector(state => state);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(destroySnackbar());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={GrowTransition}
        ContentProps={{
          "aria-describedby": "client-snackbar"
        }}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={variant ? variant : "info"}
          message={message}
        />
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;
