import React, { useState, useCallback, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  withStyles,
  InputAdornment
} from "@material-ui/core";
import FormDialog from "../Template/FormDialog";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import VisibilityPasswordTextField from "../Template/VisibilityPasswordTextField";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { withRouter } from "react-router-dom";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";
import CustomTooltip from "../Tooltip/CustomTooltip";
import { getFrenchName, getPersianName } from "../../Dictionary";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../AuthService";
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
  }
});

function EditUserDialog(props) {
  const { onClose, showSnackbar, name, type } = props;

  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordRepeat, setRegisterPasswordRepeat] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [exit, setExit] = useState(false);

  const api = new Api();
  const auth = new AuthService();

  useEffect(() => {
    (async function getUser() {
      let url = type === "ADMIN" ? URLConstant.GET_USER : URLConstant.USER_GET;
      await api
        .doPostNoAppend(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            url,
          {
            username: name
          }
        )
        .then(function(res) {
          if (res.success) {
            setUsername(res.data.username);
            setPhone(res.data.phone ? res.data.phone : "");
          } else if (
            res &&
            res.message &&
            res.message === "نام کاربری وارد شده تکراری است"
          ) {
            onClose();
            setStatus("invalidUsername");
          } else {
            onClose();
            showSnackbar(res.message, "error");
          }
          setIsLoading(false);
        })
        .catch(function() {
          onClose();
          setIsLoading(false);
        });
    })();
  }, [setUsername, setPhone, setIsLoading]);

  const register = useCallback(() => {
    if (registerPassword && registerPasswordRepeat) {
      if (registerPassword !== registerPasswordRepeat) {
        setStatus("passwordsDontMatch");
        return;
      }

      if (registerPassword.length < 6) {
        setStatus("passwordTooShort");
        return;
      }
    }

    setStatus(null);
    setIsLoading(true);
    api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.UPDATE_USER,
        {
          username: name,
          phone: phone,
          password: registerPassword
        }
      )
      .then(function(res) {
        if (res.success) {
          showSnackbar(res.message, "success");
        } else {
          showSnackbar(res.message, "error");
        }
        setIsLoading(false);
      })
      .catch(function() {
        setIsLoading(false);
      });
  }, [
    setIsLoading,
    setStatus,
    registerPassword,
    registerPasswordRepeat,
    phone
  ]);

  const openConfirmDialog = useCallback(() => {
    setOpenConfirm(true);
  }, [setOpenConfirm]);

  const closeConfirmDialog = useCallback(() => {
    setOpenConfirm(false);
  }, [setOpenConfirm]);

  const deleteAccount = useCallback(() => {
    if (registerPassword && registerPasswordRepeat) {
      if (registerPassword !== registerPasswordRepeat) {
        setStatus("passwordsDontMatch");
        return;
      }

      if (registerPassword.length < 6) {
        setStatus("passwordTooShort");
        return;
      }
    }

    setStatus(null);
    setIsLoading(true);
    api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.UPDATE_USER,
        {
          username: name,
          phone: phone,
          password: registerPassword,
          enabled: false
        }
      )
      .then(function(res) {
        if (res.success) {
          showSnackbar(res.message, "success");
        } else {
          showSnackbar(res.message, "error");
        }
        setIsLoading(false);
        auth.logout();
        setExit(true);
      })
      .catch(function() {
        setIsLoading(false);
      });
  }, [
    setIsLoading,
    setStatus,
    setExit,
    registerPassword,
    registerPasswordRepeat,
    phone
  ]);

  const redirect = () => {
    if (exit) {
      return (
        <Redirect
          push
          to={{
            pathname: "/",
            state: {}
          }}
        />
      );
    }
  };

  return (
    <div>
      <FormDialog
        loading={isLoading}
        onClose={onClose}
        open
        headline="Profil / پروفایل"
        onFormSubmit={e => {
          e.preventDefault();
          register();
        }}
        hideBackdrop
        hasCloseIcon
        content={
          <Fragment>
            <TextField
              name={"username"}
              value={username}
              margin="normal"
              required
              fullWidth
              disabled={true}
              error={status === "invalidUsername"}
              label="E-mail"
              autoComplete="new-off"
              type="text"
              helperText={(() => {
                if (status === "invalidUsername") {
                  return "آدرس ایمیل وارد شده تکراری است";
                }
                return "آدرس ایمیل";
              })()}
              onChange={() => {
                if (status === "invalidUsername") {
                  setStatus(null);
                }
              }}
              FormHelperTextProps={
                status === "invalidUsername" ? { error: true } : {}
              }
            />
            <VisibilityPasswordTextField
              name={"registerPassword"}
              margin="normal"
              fullWidth
              autoComplete="new-off"
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Mot de passe"
              value={registerPassword}
              onChange={e => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
                setRegisterPassword(e.target.value);
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
              name={"registerPasswordRepeat"}
              margin="normal"
              fullWidth
              autoComplete="new-off"
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Répéter le mot de passe"
              value={registerPasswordRepeat}
              onChange={e => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
                setRegisterPasswordRepeat(e.target.value);
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
            <TextField
              name={"phone"}
              value={phone}
              margin="normal"
              fullWidth
              error={status === "nullEmailPhone"}
              label={"Numéro de portable"}
              helperText={"شماره موبایل"}
              type="text"
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
              onChange={e => {
                if (status === "nullEmailPhone") {
                  setStatus(null);
                }
                setPhone(e.target.value);
              }}
            />
          </Fragment>
        }
        actions={
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              color="secondary"
              style={{ textTransform: "none", align: "center" }}
              disabled={isLoading}
            >
              Réactualiser / بروزرسانی
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Button
              onClick={openConfirmDialog}
              fullWidth
              variant="contained"
              size="large"
              color="danger"
              style={{
                marginTop: "10px",
                textTransform: "none",
                align: "center"
              }}
              disabled={isLoading}
            >
              Supprimer le compte / حذف حساب
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </div>
        }
      />
      <FormDialog
        loading={isLoading}
        onClose={closeConfirmDialog}
        open={openConfirm}
        onFormSubmit={e => {
          e.preventDefault();
          deleteAccount();
        }}
        hasCloseIcon
        content={
          <div>
            <Typography align={"center"}>
              <div>Êtes-vous sûr de vouloir supprimer votre compte?</div>
              <div>آیا از حذف حساب اطمینان دارید؟</div>
            </Typography>
          </div>
        }
        actions={
          <div>
            <Button
              fullWidth
              onClick={closeConfirmDialog}
              variant="contained"
              size="large"
              color="secondary"
              style={{ textTransform: "none", align: "center" }}
              disabled={isLoading}
            >
              Annuler / انصراف
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              color="danger"
              style={{
                marginTop: "10px",
                textTransform: "none",
                align: "center"
              }}
              disabled={isLoading}
            >
              Confirmer / تایید
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </div>
        }
      />
      {redirect()}
    </div>
  );
}

EditUserDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default SnackbarWrapper(
  withRouter(withStyles(styles, { withTheme: true })(EditUserDialog))
);
