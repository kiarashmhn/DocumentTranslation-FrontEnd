import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  withStyles
} from "@material-ui/core";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";

const styles = theme => ({
  dialogContent: {
    paddingTop: theme.spacing(2)
  },
  dialogActions: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

function ChangePassword(props) {
  const { onClose, classes, setLoginStatus } = props;
  const [isLoading, setIsLoading] = useState(false);

  const sendPasswordEmail = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setLoginStatus("verificationEmailSend");
      setIsLoading(false);
      onClose();
    }, 1500);
  }, [setIsLoading, setLoginStatus, onClose]);

  return (
    <Dialog
      open={true}
      hideBackdrop
      onClose={onClose}
      disableBackdropClick={isLoading}
      disableEscapeKeyDown={isLoading}
      maxWidth="xs"
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          sendPasswordEmail();
        }}
      >
        <DialogContent className={classes.dialogContent}>
          <Typography paragraph align={"center"}>
            Si vous avez oublié votre mot de passe, renseignez votre adresse
            e-mail :
          </Typography>
          <Typography paragraph dir={"rtl"} align={"center"}>
            در صورتیکه رمز عبور خود را فراموش کرده‌اید آدرس ایمیلتان را برای
            دریافت آن وارد کنید:
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Votre adresse e-mail"
            helperText={"آدرس ایمیل"}
            autoFocus
            type="email"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              onClick={onClose}
              disabled={isLoading}
              size={"small"}
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
                  Annuler
                </Typography>
                <span
                  style={{
                    display: "block",
                    fontSize: 14
                  }}
                />
                <Typography variant="body1" align="center" component={"span"}>
                  انصراف
                </Typography>
              </p>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size={"small"}
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
                  Récupérer mot de passe
                </Typography>
                <span
                  style={{
                    display: "block",
                    fontSize: 14
                  }}
                />
                <Typography variant="body1" align="center" component={"span"}>
                  بازیابی رمزعبور
                </Typography>
              </p>
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ChangePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setLoginStatus: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(ChangePassword);
