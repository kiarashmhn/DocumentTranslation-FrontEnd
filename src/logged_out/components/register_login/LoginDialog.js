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
    status
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();

  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);
    if (loginEmail.current.value !== "test@web.com") {
      setTimeout(() => {
        setStatus("invalidEmail");
        setIsLoading(false);
      }, 1500);
    } else if (loginPassword.current.value !== "HaRzwc") {
      setTimeout(() => {
        setStatus("invalidPassword");
        setIsLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        history.push("/c/dashboard");
      }, 150);
    }
  }, [setIsLoading, loginEmail, loginPassword, history, setStatus]);

  return (
    <Fragment>
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
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              required
              fullWidth
              className={"typography"}
              label="آدرس ایمیل"
              inputRef={loginEmail}
              autoFocus
              autoComplete="off"
              type="email"
              onChange={() => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidEmail" && "آدرس ایمیل وارد شده اشتباه است."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              className={"typography"}
              required
              fullWidth
              error={status === "invalidPassword"}
              label="رمز عبور"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    کلیک کنید تا بازیابی شود <b>&quot;فراموشی رمزعبور&quot;</b>
                    رمز اشتباه است. روی
                  </span>
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
            ) : (
              <HighlightedInformation>
                ایمیل تستی: <b>test@web.com</b>
                <br />
                رمزعبور تستی: <b>HaRzwc</b>
              </HighlightedInformation>
            )}
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
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string
};

export default withRouter(withStyles(styles)(LoginDialog));
