import React, { Component, Fragment } from "react";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import MUITable from "../Table/MUITable";
import * as URLConstant from "../../URLConstant";
import theme from "../../theme";
import EditUserDialog from "../register_login/EditUserDialog";

class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      openUser: false
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
              return <span>{value === 0 ? "Inactif" : "Actif"}</span>;
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
      </Fragment>
    );
  }
}
export default SnackbarWrapper(ListUser);
