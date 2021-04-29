import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { TextField, Button, Typography, withStyles } from "@material-ui/core";
import FormDialog from "../Template/FormDialog";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import VisibilityPasswordTextField from "../Template/VisibilityPasswordTextField";
import AuthService from "../../AuthService";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import * as URLConstant from "../../URLConstant";
import { Redirect } from "react-router";

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
    classes,
    onClose,
    openChangePasswordDialog,
    status,
    showSnackbar
  } = props;
  const Auth = new AuthService();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(Auth.isAdmin());
  const [isUser, setIsUser] = useState(Auth.loggedIn());
  const username = useRef();
  const loginPassword = useRef();
  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);

    Auth.login(username.current.value, loginPassword.current.value)
      .then(function(res) {
        setIsLoading(false);
        if (res.success) {
          Auth.isAdmin() ? setIsAdmin(true) : setIsUser(true);
          showSnackbar(res.message, "success");
        } else {
          setStatus("invalidUsernameOrPassword");
        }
      })
      .catch(function() {
        setIsLoading(false);
      });
  }, [setIsLoading, username, loginPassword, setStatus, setIsAdmin, setIsUser]);

  const redirect = () => {
    let url = isAdmin
      ? URLConstant.ADMIN_PANEL
      : isUser
      ? URLConstant.USER_PANEL
      : null;
    if (url) {
      return (
        <Redirect
          push
          to={{
            pathname: url,
            state: {}
          }}
        />
      );
    }
  };

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
              label="Identifiant"
              autoComplete="off"
              type="text"
              onChange={() => {
                if (status === "invalidUsernameOrPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidUsernameOrPassword" ? (
                  <div>
                    <div dir={"rtl"}>نام کاربری یا رمز عبور اشتباه است.</div>
                    <div>Nom d&apos;utilisateur ou mot de passe invalide.</div>
                  </div>
                ) : (
                  "نام کاربری"
                )
              }
              FormHelperTextProps={
                status === "invalidUsernameOrPassword" ? { error: true } : {}
              }
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              className={"typography"}
              required
              fullWidth
              error={status === "invalidUsernameOrPassword"}
              label="Mot de passe"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidUsernameOrPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidUsernameOrPassword" ? (
                  <div>
                    <div dir={"rtl"}>نام کاربری یا رمز عبور اشتباه است.</div>
                    <div>Nom d&apos;utilisateur ou mot de passe invalide.</div>
                  </div>
                ) : (
                  "رمز عبور"
                )
              }
              FormHelperTextProps={
                status === "invalidUsernameOrPassword" ? { error: true } : {}
              }
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
          </Fragment>
        }
        actions={
          <Fragment>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={isLoading}
                size={"medium"}
                style={{ textTransform: "none" }}
              >
                <p>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "0",
                      fontSize: 14
                    }}
                  />
                  <Typography variant="body1" align="center" component={"span"}>
                    Connexion
                  </Typography>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14
                    }}
                  />
                  <Typography variant="body1" align="center" component={"span"}>
                    ورود
                  </Typography>
                </p>
                {isLoading && <ButtonCircularProgress />}
              </Button>
            </div>
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
      {redirect()}
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  showSnackbar: PropTypes.func.isRequired
};

export default SnackbarWrapper(
  withStyles(styles, { withTheme: true })(LoginDialog)
);
