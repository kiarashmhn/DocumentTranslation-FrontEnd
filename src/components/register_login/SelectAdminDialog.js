import PropTypes from "prop-types";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { withRouter } from "react-router-dom";
import { Button, withStyles } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";
import FormDialog from "../Template/FormDialog";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import MultiSingleDropdown from "../Dropdown/MultiSingleDropdown";

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

function SelectAdminDialog(props) {
  const { onClose, showSnackbar, adminName, itemId } = props;
  const [admin, setAdmin] = useState(adminName);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const api = new Api();

  useEffect(() => {
    (async function getAdmins() {
      await api
        .doPostNoAppend(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.GET_ADMINS,
          {
            username: adminName
          }
        )
        .then(function(res) {
          if (res.success) {
            setAdmins(
              res.data.map(admin => {
                return { label: admin.username, value: admin.username };
              })
            );
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
  }, [setAdmins, setIsLoading]);

  const assign = useCallback(() => {
    setIsLoading(true);
    api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CLAIM_ORDER,
        {
          adminName: admin,
          orderId: itemId
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
  }, [setIsLoading, admin]);

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="انتخاب مسئول"
      onFormSubmit={e => {
        e.preventDefault();
        assign();
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <div style={{ margin: "normal", width: "100%" }}>
          <MultiSingleDropdown
            title={"انتخاب مسئول"}
            value={admin ? { value: admin, label: admin } : null}
            handleChange={e => {
              setAdmin(e.value);
            }}
            syncOptions={admins}
            isAsync={false}
            isMultiple={false}
            isDisabled={false}
          />
        </div>
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
          ثبت
          {isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

SelectAdminDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  adminName: PropTypes.string,
  itemId: PropTypes.any.isRequired
};

export default SnackbarWrapper(
  withRouter(withStyles(styles, { withTheme: true })(SelectAdminDialog))
);
