import React, { useState, useCallback, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, Button, withStyles } from "@material-ui/core";
import FormDialog from "../Template/FormDialog";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import VisibilityPasswordTextField from "../Template/VisibilityPasswordTextField";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { withRouter } from "react-router-dom";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";

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
  const { onClose, showSnackbar, name } = props;

  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordRepeat, setRegisterPasswordRepeat] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const api = new Api();

  useEffect(() => {
    (async function getUser() {
      await api
        .doPostNoAppend(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.GET_USER,
          {
            username: name
          }
        )
        .then(function(res) {
          if (res.success) {
            setUsername(res.data.username);
            setEmail(res.data.email ? res.data.email : "");
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
  }, [setUsername, setEmail, setPhone, setIsLoading]);

  const validateEmail = email => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const register = useCallback(() => {
    if (!email && !phone) {
      setStatus("nullEmailPhone");
      return;
    }
    if (email && !validateEmail(email)) {
      setStatus("invalidEmail");
      return;
    }
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
          email: email,
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
    email,
    phone
  ]);

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="اطلاعات کاربر"
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
            label="نام کاربری"
            autoComplete="new-off"
            type="text"
            helperText={(() => {
              if (status === "invalidUsername") {
                return "نام کاربری وارد شده تکراری است";
              }
              return null;
            })()}
            onChange={() => {
              if (status === "invalidUsername") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <TextField
            name={"email"}
            value={email}
            margin="normal"
            fullWidth
            error={status === "invalidEmail" || status === "nullEmailPhone"}
            label="آدرس ایمیل"
            autoComplete="new-off"
            type="text"
            helperText={(() => {
              if (status === "invalidEmail")
                return "ایمیل وارد شده نامعتبر است";
              if (status === "nullEmailPhone")
                return "آدرس ایمیل یا شماره موبایل را وارد کنید";
              return null;
            })()}
            onChange={e => {
              if (status === "invalidEmail" || status === "nullEmailPhone") {
                setStatus(null);
              }
              setEmail(e.target.value);
            }}
            FormHelperTextProps={{ error: true }}
          />
          <TextField
            name={"phone"}
            value={phone}
            margin="normal"
            fullWidth
            error={status === "nullEmailPhone"}
            label="شماره موبایل"
            type="text"
            helperText={(() => {
              if (status === "nullEmailPhone")
                return "آدرس ایمیل یا شماره موبایل را وارد کنید";
              return null;
            })()}
            onChange={e => {
              if (status === "nullEmailPhone") {
                setStatus(null);
              }
              setPhone(e.target.value);
            }}
            FormHelperTextProps={{ error: true }}
          />
          <VisibilityPasswordTextField
            name={"registerPassword"}
            margin="normal"
            fullWidth
            autoComplete="new-off"
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="رمز عبور"
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
                return "طول رمزعبور باید حداقل ۶ کاراکتر باشد";
              }
              if (status === "passwordsDontMatch") {
                return "رمزهای وارد شده مطابقت ندارند";
              }
              return null;
            })()}
            FormHelperTextProps={{ error: true }}
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
            label="تکرار رمزعبور"
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
                return "طول رمزعبور باید حداقل ۶ کاراکتر باشد";
              }
              if (status === "passwordsDontMatch") {
                return "رمزهای وارد شده مطابقت ندارند";
              }
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
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
          بروزرسانی
          {isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

EditUserDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default SnackbarWrapper(
  withRouter(withStyles(styles, { withTheme: true })(EditUserDialog))
);
