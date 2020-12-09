import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles
} from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import AuthService from "../../../AuthService";
import SnackbarWrapper from "../../../custom/Snackbar/SnackbarWrapper";

const styles = theme => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark
    }
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled
  },
  formControlLabel: {
    marginRight: 0
  }
});

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
    showSnackbar
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const username = useRef();
  const loginPassword = useRef();

  const Auth = new AuthService();

  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);

    Auth.login(username.current.value, loginPassword.current.value)
      .then(function(res) {
        if (res.success) {
          history.push("/userPanel");
          showSnackbar(res.message, "success");
        } else {
          setStatus("invalidUsernameOrPassword");
        }
        setIsLoading(false);
      })
      .catch(function() {
        setIsLoading(false);
      });
  }, [setIsLoading, username, loginPassword, history, setStatus]);

  return (
    <FormDialog
      open
      onClose={onClose}
      loading={isLoading}
      onFormSubmit={e => {
        e.preventDefault();
        login();
      }}
      hideBackdrop
      headline="ورود"
      content={
        <Fragment>
          <TextField
            autoFocus
            inputRef={username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "invalidUsernameOrPassword"}
            label="نام کاربری"
            autoComplete="off"
            type="text"
            onChange={() => {
              if (status === "invalidUsernameOrPassword") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            className={"typography"}
            required
            fullWidth
            error={status === "invalidUsernameOrPassword"}
            label="رمز عبور"
            inputRef={loginPassword}
            autoComplete="off"
            onChange={() => {
              if (status === "invalidUsernameOrPassword") {
                setStatus(null);
              }
            }}
            helperText={
              status === "invalidUsernameOrPassword" ? (
                <span dir={"rtl"}>نام کاربری یا رمز عبور اشتباه است.</span>
              ) : (
                ""
              )
            }
            FormHelperTextProps={{ error: true }}
            onVisibilityChange={setIsPasswordVisible}
            isVisible={isPasswordVisible}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={<Checkbox color="primary" />}
            label={<Typography variant="body1">ذخیره اطلاعات</Typography>}
          />
          {status === "verificationEmailSend" ? (
            <HighlightedInformation>
              نحوه بازیابی رمز عبور ، برای شما ایمیل شده است
            </HighlightedInformation>
          ) : null}
        </Fragment>
      }
      actions={
        <Fragment>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={isLoading}
            size="large"
          >
            ورود
            {isLoading && <ButtonCircularProgress />}
          </Button>
          <Typography
            align="center"
            className={classNames(
              classes.forgotPassword,
              isLoading ? classes.disabledText : null
            )}
            color="primary"
            onClick={isLoading ? null : openChangePasswordDialog}
            tabIndex={0}
            role="button"
            onKeyDown={event => {
              // For screenreaders listen to space and enter events
              if (
                (!isLoading && event.keyCode === 13) ||
                event.keyCode === 32
              ) {
                openChangePasswordDialog();
              }
            }}
          >
            فراموشی رمزعبور
          </Typography>
        </Fragment>
      }
    />
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
  showSnackbar: PropTypes.func.isRequired
};

export default SnackbarWrapper(
  withRouter(withStyles(styles, { withTheme: true })(LoginDialog))
);
