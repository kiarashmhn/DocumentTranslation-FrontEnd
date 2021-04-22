import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  withStyles,
  InputAdornment
} from "@material-ui/core";
import FormDialog from "../Template/FormDialog";
import HighlightedInformation from "../Template/HighlightedInformation";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import VisibilityPasswordTextField from "../Template/VisibilityPasswordTextField";
import AuthService from "../../AuthService";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import Box from "@material-ui/core/Box";
import { getFrenchName, getPersianName } from "../../Dictionary";
import CustomTooltip from "../Tooltip/CustomTooltip";
import * as URLConstant from "../../URLConstant";
import { Redirect } from "react-router";

const styles = theme => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut
    }),
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:enabled:hover": {
      color: theme.palette.secondary.dark
    },
    "&:enabled:focus": {
      color: theme.palette.secondary.dark
    }
  },
  secondaryHeader: {
    marginBottom: `${theme.spacing(2)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    }
  }
});

function RegisterDialog(props) {
  const {
    setStatus,
    onClose,
    status,
    classes,
    showSnackbar,
    openLoginDialog
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();
  const username = useRef();
  const email = useRef();
  const phone = useRef();

  const Auth = new AuthService();

  const validateEmail = email => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const redirect = () => {
    let url = isUser ? URLConstant.USER_PANEL : null;
    console.log(url);
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

  const register = useCallback(() => {
    if (
      registerPassword.current.value !== registerPasswordRepeat.current.value
    ) {
      setStatus("passwordsDontMatch");
      return;
    }

    if (registerPassword.current.value.length < 6) {
      setStatus("passwordTooShort");
      return;
    }

    if (!email.current.value && !phone.current.value) {
      setStatus("nullEmailPhone");
      return;
    }

    if (email.current.value && !validateEmail(email.current.value)) {
      setStatus("invalidEmail");
      return;
    }

    setStatus(null);
    setIsLoading(true);
    Auth.register(
      username.current.value,
      registerPassword.current.value,
      email.current.value,
      phone.current.value
    )
      .then(function(res) {
        setIsLoading(false);
        if (res.success) {
          setIsUser(true);
          showSnackbar(res.message, "success");
        } else {
          setStatus("invalidUsername");
          showSnackbar(res.message, "error");
        }
      })
      .catch(function() {
        setIsLoading(false);
      });
  }, [
    setIsLoading,
    setStatus,
    registerPassword,
    registerPasswordRepeat,
    setIsUser
  ]);

  return (
    <Fragment>
      <FormDialog
        loading={isLoading}
        onClose={onClose}
        open
        headline="ثبت نام"
        frenchHeadline={"S'inscrire"}
        onFormSubmit={e => {
          e.preventDefault();
          register();
        }}
        hideBackdrop
        hasCloseIcon
        content={
          <Fragment>
            {/* <Typography variant="body1" align="center" color={"error"}>
              * Inscrivez-vous pour utiliser le service
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color={"error"}
              className={classes.secondaryHeader}
            >
              برای استفاده از خدمات، ثبت نام کنید *
            </Typography>*/}
            <TextField
              inputRef={username}
              margin="normal"
              required
              autoFocus
              fullWidth
              error={status === "invalidUsername"}
              label="Nom d'utilisateur"
              autoComplete="off"
              type="text"
              helperText={
                status === "invalidUsername" ? (
                  <div>
                    <div dir={"rtl"}>نام کاربری وارد شده تکراری است.</div>
                    <div>Nom d&apos;utilisateur invalide.</div>
                  </div>
                ) : (
                  "نام کاربری"
                )
              }
              onChange={() => {
                if (status === "invalidUsername") {
                  setStatus(null);
                }
              }}
              FormHelperTextProps={
                status === "invalidUsername" ? { error: true } : {}
              }
            />
            <TextField
              inputRef={email}
              margin="normal"
              fullWidth
              error={status === "invalidEmail" || status === "nullEmailPhone"}
              label="E-mail"
              autoComplete="off"
              type="text"
              helperText={
                status === "invalidEmail" ? (
                  <div>
                    <div dir={"rtl"}>ایمیل وارد شده نامعتبر است.</div>
                    <div>Email invalide.</div>
                  </div>
                ) : status === "nullEmailPhone" ? (
                  <div>
                    <div dir={"rtl"}>
                      آدرس ایمیل یا شماره موبایل را وارد کنید.
                    </div>
                    <div>Entrez votre e-mail ou votre téléphone</div>
                  </div>
                ) : (
                  "آدرس ایمیل"
                )
              }
              onChange={() => {
                if (status === "invalidEmail" || status === "nullEmailPhone") {
                  setStatus(null);
                }
              }}
              FormHelperTextProps={
                status === "invalidEmail" || status === "nullEmailPhone"
                  ? { error: true }
                  : {}
              }
            />
            <TextField
              inputRef={phone}
              margin="normal"
              fullWidth
              error={status === "nullEmailPhone"}
              label={"Numéro de mobile"}
              autoComplete="off"
              type="number"
              helperText={
                status === "nullEmailPhone" ? (
                  <div>
                    <div dir={"rtl"}>
                      آدرس ایمیل یا شماره موبایل را وارد کنید.
                    </div>
                    <div>Entrez votre e-mail ou votre téléphone</div>
                  </div>
                ) : (
                  "شماره موبایل"
                )
              }
              onChange={() => {
                if (status === "nullEmailPhone") {
                  setStatus(null);
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip>
                      <div dir={"ltr"}>{getFrenchName("useFrenchNumber")}</div>
                      <div dir={"rtl"}>{getPersianName("useFrenchNumber")}</div>
                    </CustomTooltip>
                  </InputAdornment>
                )
              }}
              FormHelperTextProps={
                status === "nullEmailPhone" ? { error: true } : {}
              }
            />
            <VisibilityPasswordTextField
              margin="normal"
              required
              fullWidth
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Le mot de passe"
              inputRef={registerPassword}
              autoComplete="off"
              onChange={() => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
              }}
              helperText={(() => {
                if (status === "passwordTooShort") {
                  return (
                    <div>
                      <div dir={"rtl"}>
                        طول رمزعبور باید حداقل ۶ کاراکتر باشد.
                      </div>
                      <div>La longueur du mot de passe est inférieure à 6</div>
                    </div>
                  );
                }
                if (status === "passwordsDontMatch") {
                  return (
                    <div>
                      <div dir={"rtl"}>رمزهای وارد شده مطابقت ندارند.</div>
                      <div>Les mots de passe saisis ne correspondent pas</div>
                    </div>
                  );
                }
                return "رمزعبور";
              })()}
              FormHelperTextProps={
                status === "passwordTooShort" || status === "passwordsDontMatch"
                  ? { error: true }
                  : {}
              }
              isVisible={isPasswordVisible}
              onVisibilityChange={setIsPasswordVisible}
            />
            <VisibilityPasswordTextField
              margin="normal"
              required
              fullWidth
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Répéter le mot de passe"
              inputRef={registerPasswordRepeat}
              autoComplete="off"
              onChange={() => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
              }}
              helperText={(() => {
                if (status === "passwordTooShort") {
                  return (
                    <div>
                      <div dir={"rtl"}>
                        طول رمزعبور باید حداقل ۶ کاراکتر باشد.
                      </div>
                      <div>La longueur du mot de passe est inférieure à 6</div>
                    </div>
                  );
                }
                if (status === "passwordsDontMatch") {
                  return (
                    <div>
                      <div dir={"rtl"}>رمزهای وارد شده مطابقت ندارند.</div>
                      <div>Les mots de passe saisis ne correspondent pas</div>
                    </div>
                  );
                }
                return "تکرار رمزعبور";
              })()}
              FormHelperTextProps={
                status === "passwordTooShort" || status === "passwordsDontMatch"
                  ? { error: true }
                  : {}
              }
              isVisible={isPasswordVisible}
              onVisibilityChange={setIsPasswordVisible}
            />

            <Typography variant="body1" dir={"rtl"} component={"div"}>
              <Box
                fontStyle="bold"
                fontWeight="fontWeightMedium"
                display="inline"
              >
                قبلا حساب شخصی ساخته اید؟
              </Box>
              <span
                className={classes.link}
                onClick={isLoading ? null : openLoginDialog}
                tabIndex={0}
                role="button"
                onKeyDown={event => {
                  // For screenreaders listen to space and enter events
                  if (
                    (!isLoading && event.keyCode === 13) ||
                    event.keyCode === 32
                  ) {
                    openLoginDialog();
                  }
                }}
              >
                {" "}
                <Box
                  fontStyle="bold"
                  fontWeight="fontWeightMedium"
                  display="inline"
                >
                  ورود
                </Box>
              </span>
            </Typography>
            <Typography variant="body1" dir={"ltr"} component={"div"}>
              <Box
                fontStyle="bold"
                fontWeight="fontWeightMedium"
                display="inline"
              >
                Avez-vous déjà créé un compte personnel?
              </Box>
              <span
                className={classes.link}
                onClick={isLoading ? null : openLoginDialog}
                tabIndex={0}
                role="button"
                onKeyDown={event => {
                  // For screenreaders listen to space and enter events
                  if (
                    (!isLoading && event.keyCode === 13) ||
                    event.keyCode === 32
                  ) {
                    openLoginDialog();
                  }
                }}
              >
                {" "}
                <Box
                  fontStyle="bold"
                  fontWeight="fontWeightMedium"
                  display="inline"
                >
                  Connexion
                </Box>
              </span>
            </Typography>
            {status === "accountCreated" ? (
              <HighlightedInformation>
                اکانت شما ساخته شد.
              </HighlightedInformation>
            ) : null}
          </Fragment>
        }
        actions={
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            disabled={isLoading}
          >
            ثبت نام
            {isLoading && <ButtonCircularProgress />}
          </Button>
        }
      />
      {redirect()}
    </Fragment>
  );
}

RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired
};

export default SnackbarWrapper(
  withStyles(styles, { withTheme: true })(RegisterDialog)
);
