import React, { Component, Fragment } from "react";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import theme from "../theme";

export default class LegalNotes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line", marginTop: theme.spacing(2) }}
        >
          Mentions légales
        </Typography>
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          نکات قانونی
        </Typography>
        <Box
          borderColor="secondary.main"
          bgcolor="background.paper"
          border={2}
          style={{ padding: "10px", marginBottom: "30px", marginTop: "3px" }}
          m={5}
        >
          <Typography paragraph variant="body1" align="center">
            * Tous les tarifs indiqués comprennent les frais de la mise en
            disposition d’une copie numérique (PDF) et de la livraison en
            courrier simple (lettre verre). Le traitement de la demande de
            traduction commence à réception du paiement. Les délais de livraison
            sont calculés à partir de l’heure de validation de la commande par
            notre équipe. Les tarifs et les délais peuvent subir des
            modifications notamment en raison de la complexité ou de dépôt d’un
            document illisible.
          </Typography>
          <Typography paragraph variant="body1" align="center" dir="rtl">
            * تمام قیمت های ذکر شده شامل هزینه های تحویل ترجمه رسمی در نسخه
            دیجیتالی (PDF) و در نسخه کاغذی از طریق پست عادی می باشد. بررسی
            درخواست ترجمه از زمان دریافت پرداخت آغاز می شود. زمان تحویل اعلام
            شده مربوط به تحویل در نسخه دیجیتالی میباشد و از زمان تأیید سفارش
            توسط تیم ما محاسبه می شود. توجه داشته باشید که قیمت و زمان تحویل
            ممکن است به دلیل پیچیدگی یا ثبت سند ناخوانا تغییر کند.
          </Typography>
        </Box>
      </Fragment>
    );
  }
}
