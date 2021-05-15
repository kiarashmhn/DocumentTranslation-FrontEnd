import { getFrench, getPersian } from "./OrderStatus";
import IconButton from "@material-ui/core/IconButton";
import * as ColorPalette from "../ColorPalette";
import theme from "../../theme";
import ReceiptIcon from "@material-ui/icons/Receipt";
import React from "react";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import { getFrenchName, getPersianName } from "../../Dictionary";
import DraftsIcon from "@material-ui/icons/Drafts";

export function getAdminColumns(
  handleClickOpen,
  handleClickOpenBill,
  handleClickOpenMessages,
  handleClickOpenStatus
) {
  return [
    {
      name: "identifier",
      label: "N° de commande",
      options: {
        customBodyRender: function x(value, meta) {
          return (
            <div
              style={{ color: theme.palette.primary.main, cursor: "pointer" }}
              onClick={() => handleClickOpen(meta.rowData[1])}
            >
              {value}
            </div>
          );
        }
      }
    },
    {
      name: "id",
      label: "آیدی",
      options: {
        display: "excluded"
      }
    },
    {
      name: "username",
      label: "Demandeur",
      options: {
        customBodyRender: value => {
          if (value !== undefined && value !== null) {
            return (
              <span
                color={theme.palette.primary.main}
                tabIndex={0}
                role="button"
              >
                {value}
              </span>
            );
          }
        }
      }
    },
    {
      name: "status",
      label: "État",
      options: {
        customBodyRender: (meta, value) => {
          if (value !== undefined && value !== null) {
            return (
              <span
                onClick={() => handleClickOpenStatus(meta.rowData[1])}
                style={{ cursor: "pointer", color: theme.palette.primary.main }}
              >
                {getFrench(value)}
              </span>
            );
          }
        }
      }
    },
    {
      name: "hasNewUserMessage",
      label: "Message",
      options: {
        customBodyRender: function x(value, meta) {
          return (
            <IconButton
              aria-label="delete"
              onClick={() => handleClickOpenMessages(meta.rowData[1])}
              style={{
                color: value ? ColorPalette.red : ColorPalette.cornflowerblue
              }}
            >
              {value ? (
                <MarkunreadIcon fontSize="small" />
              ) : (
                <DraftsIcon fontSize="small" />
              )}
            </IconButton>
          );
        }
      }
    },
    {
      name: "isPaymentVerified",
      label: "Facture",
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null && !!value) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpenBill(meta.rowData[1])}
                style={{ color: theme.palette.primary.main }}
              >
                <ReceiptIcon fontSize="small" />
              </IconButton>
            );
          } else {
            return <span />;
          }
        }
      }
    }
  ];
}

export function getSuperAdminColumns(
  handleClickOpenUser,
  handleClickOpen,
  handleClickOpenBill,
  handleClickOpenAdmins,
  handleClickOpenPayment,
  handleClickOpenMessages,
  handleClickOpenStatus
) {
  return [
    {
      name: "identifier",
      label: "N° de commande",
      options: {
        customBodyRender: function x(value, meta) {
          return (
            <div
              style={{ color: theme.palette.primary.main, cursor: "pointer" }}
              onClick={() => handleClickOpen(meta.rowData[1])}
            >
              {value}
            </div>
          );
        }
      }
    },
    {
      name: "id",
      label: "آیدی",
      options: {
        display: "excluded"
      }
    },
    {
      name: "username",
      label: "Demandeur",
      options: {
        customBodyRender: value => {
          if (value !== undefined && value !== null) {
            return (
              <span
                style={{ color: theme.palette.primary.main, cursor: "pointer" }}
                color={theme.palette.primary.main}
                onClick={() => handleClickOpenUser(value)}
                tabIndex={0}
                role="button"
                onKeyDown={event => {
                  if (event.keyCode === 13 || event.keyCode === 32) {
                    handleClickOpenUser(value);
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
      name: "status",
      label: "État",
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null) {
            return (
              <span
                onClick={() => handleClickOpenStatus(meta.rowData[1])}
                style={{ cursor: "pointer", color: theme.palette.primary.main }}
              >
                {getFrench(value)}
              </span>
            );
          }
        }
      }
    },
    {
      name: "adminName",
      label: "Responsable",
      options: {
        customBodyRender: (value, meta) => {
          if (
            meta.rowData &&
            (meta.rowData[3] === "IN_PROGRESS" || meta.rowData[3] === "PENDING")
          ) {
            if (value !== undefined && value !== null) {
              return (
                <span
                  style={{
                    color: theme.palette.primary.main,
                    cursor: "pointer"
                  }}
                  color={theme.palette.primary.main}
                  onClick={() => handleClickOpenAdmins(meta.rowData[1], value)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={event => {
                    if (event.keyCode === 13 || event.keyCode === 32) {
                      handleClickOpenAdmins(meta.rowData[1], value);
                    }
                  }}
                >
                  {value}
                </span>
              );
            } else {
              return (
                <span
                  style={{
                    color: theme.palette.danger.main,
                    cursor: "pointer"
                  }}
                  color={theme.palette.danger.main}
                  onClick={() => handleClickOpenAdmins(meta.rowData[1], null)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={event => {
                    if (event.keyCode === 13 || event.keyCode === 32) {
                      handleClickOpenAdmins(meta.rowData[1], null);
                    }
                  }}
                >
                  À déterminer
                </span>
              );
            }
          }
        }
      }
    },
    {
      name: "hasNewUserMessage",
      label: "Message",
      options: {
        customBodyRender: function x(value, meta) {
          return (
            <IconButton
              aria-label="delete"
              onClick={() => handleClickOpenMessages(meta.rowData[1])}
              style={{
                color: value ? ColorPalette.red : ColorPalette.cornflowerblue
              }}
            >
              {value ? (
                <MarkunreadIcon fontSize="small" />
              ) : (
                <DraftsIcon fontSize="small" />
              )}
            </IconButton>
          );
        }
      }
    },
    {
      name: "isPaid",
      label: "Info paiement",
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null && !!value) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpenPayment(meta.rowData[1])}
                style={{ color: theme.palette.primary.main }}
              >
                <MonetizationOnIcon fontSize="small" />
              </IconButton>
            );
          } else {
            return <span />;
          }
        }
      }
    },
    {
      name: "isPaymentVerified",
      label: "Facture",
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null && !!value) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpenBill(meta.rowData[1])}
                style={{ color: theme.palette.primary.main }}
              >
                <ReceiptIcon fontSize="small" />
              </IconButton>
            );
          } else {
            return <span />;
          }
        }
      }
    }
  ];
}

export function getUserColumns(
  handleClickOpen,
  handleClickOpenBill,
  handleClickOpenMessages,
  handleClickOpenStatus
) {
  return [
    {
      name: "identifier",
      label: (
        <div>
          <div dir={"ltr"}>{getFrenchName("orderId")}</div>
          <div dir={"rtl"}>{getPersianName("orderId")}</div>
        </div>
      ),
      options: {
        customBodyRender: (value, meta) => {
          if (
            meta.rowData &&
            (meta.rowData[2] === "COMPLETING" ||
              meta.rowData[2] === "WAITING_FOR_PAYMENT")
          ) {
            return (
              <div
                style={{ color: theme.palette.primary.main, cursor: "pointer" }}
                onClick={() => handleClickOpen(meta.rowData[1])}
              >
                {value}
              </div>
            );
          }
        }
      }
    },
    {
      name: "id",
      label: "آیدی",
      options: {
        display: "excluded"
      }
    },
    {
      name: "status",
      label: (
        <div>
          <div dir={"ltr"}>{getFrenchName("orderStatus")}</div>
          <div dir={"rtl"}>{getPersianName("orderStatus")}</div>
        </div>
      ),
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null) {
            return (
              <div
                onClick={() => handleClickOpenStatus(meta.rowData[1])}
                style={{ cursor: "pointer", color: theme.palette.primary.main }}
              >
                <div dir={"ltr"}>{getFrench(value)}</div>
                <div dir={"rtl"}>{getPersian(value)}</div>
              </div>
            );
          }
        }
      }
    },
    {
      name: "hasNewAdminMessage",
      label: (
        <div>
          <div dir={"ltr"}>{getFrenchName("message")}</div>
          <div dir={"rtl"}>{getPersianName("message")}</div>
        </div>
      ),
      options: {
        customBodyRender: function x(value, meta) {
          return (
            <IconButton
              aria-label="delete"
              onClick={() => handleClickOpenMessages(meta.rowData[1])}
              style={{
                color: value ? ColorPalette.red : ColorPalette.cornflowerblue
              }}
            >
              {value ? (
                <MarkunreadIcon fontSize="small" />
              ) : (
                <DraftsIcon fontSize="small" />
              )}
            </IconButton>
          );
        }
      }
    },
    {
      name: "isPaymentVerified",
      label: (
        <div>
          <div dir={"ltr"}>{getFrenchName("facture")}</div>
          <div dir={"rtl"}>{getPersianName("facture")}</div>
        </div>
      ),
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null && !!value) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpenBill(meta.rowData[1])}
                style={{ color: theme.palette.primary.main }}
              >
                <ReceiptIcon fontSize="small" />
              </IconButton>
            );
          } else {
            return <span />;
          }
        }
      }
    }
  ];
}
