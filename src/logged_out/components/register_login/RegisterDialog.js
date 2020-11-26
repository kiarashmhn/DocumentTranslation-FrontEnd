import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import {
  FormHelperText,
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
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark
    }
  }
});

function RegisterDialog(props) {
  const { setStatus, theme, onClose, openTermsDialog, status, classes } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const registerTermsCheckbox = useRef();
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();

  const register = useCallback(() => {
    if (!registerTermsCheckbox.current.checked) {
      setHasTermsOfServiceError(true);
      return;
    }
    if (
      registerPassword.current.value !== registerPasswordRepeat.current.value
    ) {
      setStatus("passwordsDontMatch");
      return;
    }
    setStatus(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [
    setIsLoading,
    setStatus,
    setHasTermsOfServiceError,
    registerPassword,
    registerPasswordRepeat,
    registerTermsCheckbox
  ]);

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="ثبت نام"
      onFormSubmit={e => {
        e.preventDefault();
        register();
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "invalidEmail"}
            label="آدرس ایمیل"
            autoFocus
            autoComplete="off"
            type="email"
            onChange={() => {
              if (status === "invalidEmail") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="رمز عبور"
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
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="تکرار رمزعبور"
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
          <FormControlLabel
            style={{ marginRight: 0 }}
            control={
              <Checkbox
                color="primary"
                inputRef={registerTermsCheckbox}
                onChange={() => {
                  setHasTermsOfServiceError(false);
                }}
              />
            }
            label={
              <Typography variant="body1">
                شرایط و مقررات
                <span
                  className={classes.link}
                  onClick={isLoading ? null : openTermsDialog}
                  tabIndex={0}
                  role="button"
                  onKeyDown={event => {
                    // For screenreaders listen to space and enter events
                    if (
                      (!isLoading && event.keyCode === 13) ||
                      event.keyCode === 32
                    ) {
                      openTermsDialog();
                    }
                  }}
                >
                  {" "}
                  را تایید می‌کنم
                </span>
              </Typography>
            }
          />
          {hasTermsOfServiceError && (
            <FormHelperText
              error
              style={{
                display: "block",
                marginTop: theme.spacing(-1)
              }}
            >
              برای ساخت پروفایل باید شرایط و مقررات را تایید کنید
            </FormHelperText>
          )}
          {status === "accountCreated" ? (
            <HighlightedInformation>
              اکانت شما ساخته شد. برای ورود روی لینکی که برایتان ایمیل شده‌است
              کلیک کنید.
            </HighlightedInformation>
          ) : (
            <HighlightedInformation>
              ثبت نام فعلا کار نمی‌کند
            </HighlightedInformation>
          )}
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
  );
}

RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
