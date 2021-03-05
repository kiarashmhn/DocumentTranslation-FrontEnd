import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import ribFile from "../../images/rib.png";

const frenchNote =
  "* Ajouter ensuite la preuve de virement bancaire ici sur votre compte client. Vous pouvez régler votre commande par virement bancaire. Dans ce cas, votre commande sera validée, traitée et expédiée dès réception de votre virement. Renseignez les informations suivantes sur l’ordre de virement à votre banque :";
const persianNote =
  "* هزینه ترجمه را به حساب بانکی واریز کرده و رسید واریز را در حساب کاربری برای ما ارسال کنید. اطلاعات زیر را در دستور واریز بانکی خود می بایست ثبت کنید :";

const persianNote2 =
  "مبلغ هزینه ترجمه را در قالب چک در وجه Daniel MOVAHHEDI به آدرس زیر با قرار دادن شماره سفارش در نامه ارسال کنید: ";
const frenchNote2 =
  "Envoyer votre chèque en indiquant le numero de votre commande dans votre courier à l’ordre de Daniel MOVAHHEDI à l’adresse suivante :\n";
const address = "99 boulevard Général Vanier, 14000 CAEN \n";

const persianNote3 =
  "از طریق Western Union در وجه Daniel MOVAHHEDI مبلغ هزینه را پرداخت کنید.";
const frenchNote3 = "Western Union à l’ordre de Daniel MOVAHHEDI.";

export function methodsInfo(id, code, price) {
  const billInfo = `   Montant : ${price}€
\n  Motif du virement : « francedoc${code + id} »`;
  /*\n  Informations de notre RIB :
\n      o Nom : MOVAHHEDI Daniel
\n      o IBAN : FR62 3000 2059 5100 0019 3403 P54
\n      o BIC : CRLYFRPP*/

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
            style={{
              whiteSpace: "pre-line",
              fontWeight: "bold",
              display: "block",
              align: "center"
            }}
          >
            {billInfo}
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
            <a href={ribFile} download="rib.png">
              <div
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
            </a>
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
            {address}
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