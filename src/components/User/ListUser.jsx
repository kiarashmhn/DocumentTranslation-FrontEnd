import React, { Component, Fragment } from "react";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import MUITable from "../Table/MUITable";
import * as URLConstant from "../../URLConstant";
import theme from "../../theme";
import EditUserDialog from "../register_login/EditUserDialog";
import IconButton from "@material-ui/core/IconButton";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DeleteExpiredUsers from "./DeleteExpiredUsers";
import SendExpiryEmail from "./SendExpiryEmail";

class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      openUser: false,
      openDeletes: false,
      openWarning: false
    };
    this.refElement = React.createRef();
  }

  handleClickOpenUser = username => {
    this.setState({
      openUser: true,
      username: username
    });
  };

  handleClickCloseUser = () => {
    this.setState({
      openUser: false,
      username: ""
    });
    this.getData();
  };

  handleClickDeletes = () => {
    this.setState({
      openDeletes: true
    });
  };

  handleClickCloseDeletes = () => {
    this.setState({
      openDeletes: false
    });
    this.getData();
  };

  handleClickWarning = () => {
    this.setState({
      openWarning: true
    });
  };

  handleClickCloseWarning = () => {
    this.setState({
      openWarning: false
    });
  };

  getColumns = () => {
    return [
      {
        name: "username",
        label: "E-mail",
        options: {
          customBodyRender: value => {
            if (value !== undefined && value !== null) {
              return (
                <span
                  style={{
                    color: theme.palette.primary.main,
                    cursor: "pointer"
                  }}
                  color={theme.palette.primary.main}
                  onClick={() => this.handleClickOpenUser(value)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={event => {
                    if (event.keyCode === 13 || event.keyCode === 32) {
                      this.handleClickOpenUser(value);
                    }
                  }}
                >
                  {value}
                </span>
              );
            }
          }
        }
      },
      {
        name: "phone",
        label: "Numéro de portable"
      },
      {
        name: "level",
        label: "Genre",
        options: {
          customBodyRender: value => {
            if (value !== undefined && value !== null) {
              return (
                <span>
                  {value === 0
                    ? "Utilisateur"
                    : value === 1
                    ? "Traducteur"
                    : "Admin"}
                </span>
              );
            }
          }
        }
      },
      {
        name: "orderCount",
        label: "N° de commandes",
        options: {
          customBodyRender: value => {
            if (value !== undefined && value !== null) {
              return <span>{value}</span>;
            }
          }
        }
      },
      {
        name: "creationTime",
        label: "Date de création",
        options: {
          customBodyRender: value => {
            if (value !== undefined && value !== null) {
              return <span>{value}</span>;
            }
          }
        }
      },
      {
        name: "enable",
        label: "État",
        options: {
          customBodyRender: value => {
            if (value !== undefined && value !== null) {
              return <span>{value === false ? "Inactif" : "Actif"}</span>;
            }
          }
        }
      }
    ];
  };

  getData = () => {
    this.refElement.current.reload();
  };

  render() {
    const title = "Liste d'utilisateur / لیست کاربران";

    const url =
      process.env.REACT_APP_HOST_URL +
      process.env.REACT_APP_MAIN_PATH +
      URLConstant.GET_USERS;
    return (
      <Fragment>
        <MUITable
          dir={"rtl"}
          ref={this.refElement}
          columns={this.getColumns()}
          url={url}
          method={"Post"}
          title={title}
          otherOptions={
            <div>
              <IconButton
                aria-label="delete"
                onClick={this.handleClickDeletes}
                style={{ color: "#e53935" }}
              >
                <DeleteSweepIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={this.handleClickWarning}
                style={{ color: "#e53935" }}
              >
                <MailOutlineIcon fontSize="small" />
              </IconButton>
            </div>
          }
          filter={{
            componentTitle: title,
            staticData: [
              {
                key: "username",
                type: "text",
                grid: 12,
                notRequired: true
              },
              {
                key: "phone",
                type: "text",
                grid: 12,
                notRequired: true
              }
            ],
            componentsData: {}
          }}
        />
        {this.state.openUser && (
          <EditUserDialog
            name={this.state.username}
            onClose={this.handleClickCloseUser}
            type={"ADMIN"}
          />
        )}
        {this.state.openDeletes && (
          <DeleteExpiredUsers onClose={this.handleClickCloseDeletes} />
        )}
        {this.state.openWarning && (
          <SendExpiryEmail onClose={this.handleClickCloseWarning} />
        )}
      </Fragment>
    );
  }
}
export default SnackbarWrapper(ListUser);
