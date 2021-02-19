import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

const frenchNote =
  "* Ajouter ensuite la preuve de virement bancaire ici sur votre compte client. (Il appartient au client de transmettre la preuve du paiement en cas de virement ou d’envoi de chèque. Le justificatif de paiement permet le traitement de la traduction. Toute omission de transmission du justificatif de paiement retarderait le traitement de la traduction.) Renseignez les informations suivantes sur l’ordre de virement à votre banque :";
const persianNote =
  "* هزینه ترجمه را به حساب بانکی واریز کرده و رسید واریز را در حساب کاربری برای ما ارسال کنید. (ارسال سند پرداخت در صورت واریز در حساب بانکی یا ارسال چک به عهده مشتری است. سند پرداخت امکان شروع کار ترجمه را فراهم می کند. هرگونه عدم ارسال سند پرداخت، انجام ترجمه را به تأخیر می اندازد.) اطلاعات زیر را در دستور واریز بانکی خود می بایست ثبت کنید :";

const persianNote2 =
  "مبلغ هزینه ترجمه را در قالب چک در وجه Daniel MOVAHHEDI به آدرس زیر ارسال کنید: ";
const persianNote22 =
  "شماره سفارش را در نامه خود اضافه کنید و ترجیحاً یک عکس از چک را برای ما ارسال کنید.\n";
const frenchNote2 =
  "Envoie d’un chèque à l’ordre de Daniel MOVAHHEDI à l’adresse suivante :\n";
const address = "99 boulevard Général Vanier, 14000 CAEN \n";
const frenchNote22 =
  "Le traducteur commencera la traduction dès réception de votre chèque. Indiquer le numéro de votre commande dans votre courrier et de préférence, déposez une copie de votre chèque sur votre compte. \n";

const persianNote3 =
  "از طریق Western Union در وجه Daniel MOVAHHEDI مبلغ هزینه را پرداخت کنید.";
const frenchNote3 = "Western Union à l’ordre de Daniel MOVAHHEDI.";

export function methodsInfo(id, code, price) {
  const rib = `   • Montant : ${price}€
\n  • Motif du virement : « francedoc${code + id} »
\n  • Informations de notre RIB :
\n      o Nom : MOVAHHEDI Daniel
\n      o IBAN : FR62 3000 2059 5100 0019 3403 P54
\n      o BIC : CRLYFRPP
`;
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
            style={{ whiteSpace: "pre-line" }}
          >
            {rib}
          </Typography>
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
          <Typography
            paragraph
            variant="body1"
            align="center"
            style={{ whiteSpace: "pre-line" }}
          >
            {frenchNote22}
          </Typography>
          <Typography
            paragraph
            variant="body1"
            align="center"
            dir="rtl"
            style={{ whiteSpace: "pre-line" }}
          >
            {persianNote22}
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
