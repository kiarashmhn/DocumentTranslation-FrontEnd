import React, { Fragment } from "react";
import { Box, Typography } from "@material-ui/core";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";

export const methods = [
  {
    title: "پرداخت با کارت",
    frenchTitle: "Carte bancaire"
  },
  {
    title: "واریز به حساب",
    frenchTitle: "Virement bancaire",
    inputKey: "num"
  },
  {
    title: "ارسال چک",
    frenchTitle: "Chèque",
    inputKey: "chequeNum"
  },
  {
    title: "وسترن یونیون",
    frenchTitle: "Western Union",
    inputKey: "num"
  }
];

export function methodsInfo(id, code, price, config) {
  const api = new Api();

  const frenchNote =
    "* Vous pouvez régler votre commande par virement bancaire. Ajouter ensuite la preuve de virement bancaire ici sur votre compte client. Dans ce cas, votre commande sera validée, traitée et expédiée dès réception de votre virement. Renseignez les informations suivantes sur l’ordre de virement à votre banque :";
  const persianNote =
    "* هزینه ترجمه را به حساب بانکی واریز کرده و رسید واریز را در حساب کاربری برای ما ارسال کنید. اطلاعات زیر را در دستور واریز بانکی خود می بایست ثبت کنید :";

  const persianNote2 = `مبلغ هزینه ترجمه را در قالب چک در وجه  ${config.accName +
    " " +
    config.accLastName} به آدرس زیر با قرار دادن شماره سفارش در نامه ارسال کنید:`;
  const frenchNote2 = `Envoyer votre chèque en indiquant le numero de votre commande dans votre courier à l’ordre de ${config.accName +
    " " +
    config.accLastName} à l’adresse suivante :\n`;
  const address = config.address + "\n";

  const persianNote3 =
    "از طریق Western Union در وجه Daniel MOVAHHEDI مبلغ هزینه را پرداخت کنید.";
  const frenchNote3 = "Western Union à l’ordre de Daniel MOVAHHEDI.";

  const downloadRib = () => {
    api.getFile(
      process.env.REACT_APP_HOST_URL +
        process.env.REACT_APP_MAIN_PATH +
        URLConstant.GET_DOCUMENT,
      config.ribId,
      config.ribName
    );
  };

  return [
    {
      title: "پرداخت با کارت",
      frenchTitle: "Carte bancaire",
      content: <Fragment />
    },
    {
      title: "واریز به حساب",
      frenchTitle: "Virement bancaire",
      inputKey: "num",
      content: (
        <Fragment>
          <Typography paragraph variant="body1" align="center">
            {frenchNote}
          </Typography>
          <Typography paragraph variant="body1" align="center" dir="rtl">
            {persianNote}
          </Typography>
          <Typography
            paragraph
            variant="body1"
            align="center"
            component={"div"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {"Montant : "}
            &nbsp;
            <Box
              style={{
                fontWeight: "bold"
              }}
            >
              {price + "€"}
            </Box>
            {""}
          </Typography>
          <Typography
            paragraph
            variant="body1"
            align="center"
            component={"div"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {"Motif du virement : "}
            &nbsp;
            <Box
              style={{
                fontWeight: "bold"
              }}
            >
              {"francedoc" + code + id}
            </Box>
            {""}
          </Typography>
          <Typography
            paragraph
            variant="body1"
            align="center"
            component={"span"}
            style={{ fontWeight: "bold", display: "block", align: "center" }}
          >
            Informations de notre RIB
          </Typography>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex"
            }}
          >
            <div
              onClick={() => downloadRib()}
              style={{
                display: "block",
                justifyContent: "center",
                alignItems: "center",
                backgroundRepeat: "no-repeat",
                verticalAlign: "middle",
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/logged_out/rib.png)`,
                backgroundSize: "contain",
                height: "262px",
                width: "422px",
                cursor: "pointer"
              }}
            />
          </div>
        </Fragment>
      )
    },
    {
      title: "ارسال چک",
      frenchTitle: "Chèque",
      inputKey: "chequeNum",
      content: (
        <Fragment>
          <Typography
            paragraph
            variant="body1"
            align="center"
            style={{ whiteSpace: "pre-line" }}
          >
            {frenchNote2}
          </Typography>
          <Typography
            paragraph
            variant="body1"
            align="center"
            dir="rtl"
            style={{ whiteSpace: "pre-line" }}
          >
            {persianNote2}
          </Typography>
          <Typography
            paragraph
            variant="body1"
            align="center"
            style={{ whiteSpace: "pre-line" }}
          >
            <Box
              style={{
                fontWeight: "bold"
              }}
            >
              {address}
            </Box>
          </Typography>
        </Fragment>
      )
    },
    {
      title: "وسترن یونیون",
      frenchTitle: "Western Union",
      inputKey: "num",
      content: (
        <Fragment>
          <Typography paragraph variant="body1" align="center">
            {frenchNote3}
          </Typography>
          <Typography paragraph variant="body1" align="center" dir="rtl">
            {persianNote3}
          </Typography>
        </Fragment>
      )
    }
  ];
}
