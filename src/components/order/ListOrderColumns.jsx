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
import BackupIcon from "@material-ui/icons/Backup";
import DescriptionIcon from "@material-ui/icons/Description";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { getTypeByKey } from "./OrderTypes";

export function getAdminColumns(
  handleClickOpen,
  handleClickOpenMessages,
  handleClickOpenStatus,
  handleClickOpenResult,
  handleDownload
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
      name: "finalDocumentId",
      label: "Traduction",
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null) {
            return (
              <div style={{ display: "inline-flex" }}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClickOpenResult(meta.rowData[1])}
                  style={{ color: theme.palette.primary.main }}
                >
                  <BackupIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDownload(value)}
                  style={{ color: "#43a047" }}
                >
                  <DescriptionIcon fontSize="small" />
                </IconButton>
              </div>
            );
          } else {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpenResult(meta.rowData[1])}
                style={{ color: theme.palette.primary.main }}
              >
                <BackupIcon fontSize="small" />
              </IconButton>
            );
          }
        }
      }
    }
  ];
}

export function getSuperAdminColumns(
  handleClickOpenUser,
  handleClickOpen,
  handleClickOpenAdmins,
  handleClickOpenPayment,
  handleClickOpenMessages,
  handleClickOpenStatus,
  handleClickOpenResult,
  handleDownload,
  handleClickDelete,
  handleClickOpenCreatePreBill
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
          } else if (value !== undefined && value !== null) {
            return <span>{value}</span>;
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
          } else if (meta.rowData[0].toString().includes("DD")) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpenCreatePreBill(meta.rowData[1])}
                style={{ color: theme.palette.danger.main }}
              >
                <ReceiptIcon fontSize="small" />
              </IconButton>
            );
          } else return <span />;
        }
      }
    },
    {
      name: "finalDocumentId",
      label: "Traduction",
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null) {
            return (
              <div style={{ display: "inline-flex" }}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClickOpenResult(meta.rowData[1])}
                  style={{ color: theme.palette.primary.main }}
                >
                  <BackupIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDownload(value)}
                  style={{ color: "#43a047" }}
                >
                  <DescriptionIcon fontSize="small" />
                </IconButton>
              </div>
            );
          } else {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpenResult(meta.rowData[1])}
                style={{ color: theme.palette.primary.main }}
              >
                <BackupIcon fontSize="small" />
              </IconButton>
            );
          }
        }
      }
    },
    {
      name: "id",
      label: "Supprimer",
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() =>
                  handleClickDelete(meta.rowData[1], meta.rowData[0])
                }
                style={{ color: "#e53935" }}
              >
                <DeleteForeverIcon fontSize="small" />
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
  handleClickOpenStatus,
  handleDownload,
  handleClickDelete,
  handleClickOpenPreBill
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
            (meta.rowData[3] === "COMPLETING" ||
              meta.rowData[3] === "WAITING_FOR_PAYMENT")
          ) {
            return (
              <div
                style={{ color: theme.palette.primary.main, cursor: "pointer" }}
                onClick={() => handleClickOpen(meta.rowData[1])}
              >
                {value}
              </div>
            );
          } else return <div>{value}</div>;
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
      name: "type",
      label: (
        <div>
          <div dir={"ltr"}>{getFrenchName("documentType")}</div>
          <div dir={"rtl"}>{getPersianName("documentType")}</div>
        </div>
      ),
      options: {
        customBodyRender: value => {
          if (getTypeByKey(value)) {
            return (
              <div>
                <div>{getFrenchName(getTypeByKey(value).key)}</div>
                <div>{getPersianName(getTypeByKey(value).key)}</div>
              </div>
            );
          } else return <div>{value}</div>;
        }
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
      name: "preBillAmount",
      label: "مبلغ",
      options: {
        display: "excluded"
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
      name: "finalDocumentId",
      label: (
        <div>
          <div dir={"ltr"}>{"Traduction"}</div>
          <div dir={"rtl"}>{"ترجمه"}</div>
        </div>
      ),
      options: {
        customBodyRender: value => {
          if (value !== undefined && value !== null) {
            return (
              <div style={{ display: "inline-flex" }}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDownload(value)}
                  style={{ color: "#43a047" }}
                >
                  <DescriptionIcon fontSize="small" />
                </IconButton>
              </div>
            );
          } else {
            return <span />;
          }
        }
      }
    },
    {
      name: "isPaymentVerified",
      label: (
        <div>
          <div dir={"ltr"}>{getFrenchName("factureOrDevis")}</div>
          <div dir={"rtl"}>{getPersianName("factureOrDevis")}</div>
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
          } else if (
            meta.rowData[4] !== undefined &&
            meta.rowData[4] !== null
          ) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpenPreBill(meta.rowData[1])}
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
    },
    {
      name: "id",
      label: (
        <div>
          <div dir={"ltr"}>{"Supprimer"}</div>
          <div dir={"rtl"}>{"حذف"}</div>
        </div>
      ),
      options: {
        customBodyRender: (value, meta) => {
          if (value !== undefined && value !== null) {
            return (
              <IconButton
                aria-label="delete"
                onClick={() =>
                  handleClickDelete(meta.rowData[1], meta.rowData[0])
                }
                style={{ color: "#e53935" }}
              >
                <DeleteForeverIcon fontSize="small" />
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
