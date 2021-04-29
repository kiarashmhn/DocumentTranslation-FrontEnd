import React, { Component, Fragment } from "react";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import theme from "../theme";
import Button from "@material-ui/core/Button";
import { getFrenchName, getPersianName } from "../Dictionary";

export default class DataPrivacy extends Component {
  constructor(props) {
    super(props);
    this.privacyRef = React.createRef();
  }

  close = () => {
    let win = window.open("about:blank", "_self");
    win.close();
  };

  componentDidMount() {
    this.privacyRef.current.scrollIntoView();
  }

  render() {
    return (
      <Fragment>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
          align="center"
          style={{ whiteSpace: "pre-line", marginTop: theme.spacing(2) }}
        >
          Mentions légales
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
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
            ممکن است به دلیل پیچیدگی یا ثبت سند ناخوانا تغییر کند. دیجیتالی
            (PDF) و در نسخه کاغذی از طریق پست عادی می باشد. بررسی درخواست ترجمه
            از زمان دریافت پرداخت آغاز می شود. زمان تحویل اعلام شده مربوط به
            تحویل در نسخه دیجیتالی میباشد و از زمان تأیید سفارش توسط تیم ما
            محاسبه می شود. توجه داشته باشید که قیمت و زمان تحویل ممکن است به
            دلیل پیچیدگی یا ثبت سند ناخوانا تغییر کند. دیجیتالی (PDF) و در نسخه
            کاغذی از طریق پست عادی می باشد. بررسی درخواست ترجمه از زمان دریافت
            پرداخت آغاز می شود. زمان تحویل اعلام شده مربوط به تحویل در نسخه
            دیجیتالی میباشد و از زمان تأیید سفارش توسط تیم ما محاسبه می شود.
            توجه داشته باشید که قیمت و زمان تحویل ممکن است به دلیل پیچیدگی یا
            ثبت سند ناخوانا تغییر کند. دیجیتالی (PDF) و در نسخه کاغذی از طریق
            پست عادی می باشد. بررسی درخواست ترجمه از زمان دریافت پرداخت آغاز می
            شود. زمان تحویل اعلام شده مربوط به تحویل در نسخه دیجیتالی میباشد و
            از زمان تأیید سفارش توسط تیم ما محاسبه می شود. توجه داشته باشید که
            قیمت و زمان تحویل ممکن است به دلیل پیچیدگی یا ثبت سند ناخوانا تغییر
            کند. دیجیتالی (PDF) و در نسخه کاغذی از طریق پست عادی می باشد. بررسی
            درخواست ترجمه از زمان دریافت پرداخت آغاز می شود. زمان تحویل اعلام
            شده مربوط به تحویل در نسخه دیجیتالی میباشد و از زمان تأیید سفارش
            توسط تیم ما محاسبه می شود. توجه داشته باشید که قیمت و زمان تحویل
            ممکن است به دلیل پیچیدگی یا ثبت سند ناخوانا تغییر کند. دیجیتالی
            (PDF) و در نسخه کاغذی از طریق پست عادی می باشد. بررسی درخواست ترجمه
            از زمان دریافت پرداخت آغاز می شود. زمان تحویل اعلام شده مربوط به
            تحویل در نسخه دیجیتالی میباشد و از زمان تأیید سفارش توسط تیم ما
            محاسبه می شود. توجه داشته باشید که قیمت و زمان تحویل ممکن است به
            دلیل پیچیدگی یا ثبت سند ناخوانا تغییر کند. دیجیتالی (PDF) و در نسخه
            کاغذی از طریق پست عادی می باشد. بررسی درخواست ترجمه از زمان دریافت
            پرداخت آغاز می شود. زمان تحویل اعلام شده مربوط به تحویل در نسخه
            دیجیتالی میباشد و از زمان تأیید سفارش توسط تیم ما محاسبه می شود.
            توجه داشته باشید که قیمت و زمان تحویل ممکن است به دلیل پیچیدگی یا
            ثبت سند ناخوانا تغییر کند. دیجیتالی (PDF) و در نسخه کاغذی از طریق
            پست عادی می باشد. بررسی درخواست ترجمه از زمان دریافت پرداخت آغاز می
            شود. زمان تحویل اعلام شده مربوط به تحویل در نسخه دیجیتالی میباشد و
            از زمان تأیید سفارش توسط تیم ما محاسبه می شود. توجه داشته باشید که
            قیمت و زمان تحویل ممکن است به دلیل پیچیدگی یا ثبت سند ناخوانا تغییر
            کند. دیجیتالی (PDF) و در نسخه کاغذی از طریق پست عادی می باشد. بررسی
            درخواست ترجمه از زمان دریافت پرداخت آغاز می شود. زمان تحویل اعلام
            شده مربوط به تحویل در نسخه دیجیتالی میباشد و از زمان تأیید سفارش
            توسط تیم ما محاسبه می شود. توجه داشته باشید که قیمت و زمان تحویل
            ممکن است به دلیل پیچیدگی یا ثبت سند ناخوانا تغییر کند. دیجیتالی
            (PDF) و در نسخه کاغذی از طریق پست عادی می باشد. بررسی درخواست ترجمه
            از زمان دریافت پرداخت آغاز می شود. زمان تحویل اعلام شده مربوط به
            تحویل در نسخه دیجیتالی میباشد و از زمان تأیید سفارش توسط تیم ما
            محاسبه می شود. توجه داشته باشید که قیمت و زمان تحویل ممکن است به
            دلیل پیچیدگی یا ثبت سند ناخوانا تغییر کند. دیجیتالی (PDF) و در نسخه
            کاغذی از طریق پست عادی می باشد. بررسی درخواست ترجمه از زمان دریافت
            پرداخت آغاز می شود. زمان تحویل اعلام شده مربوط به تحویل در نسخه
            دیجیتالی میباشد و از زمان تأیید سفارش توسط تیم ما محاسبه می شود.
            توجه داشته باشید که قیمت و زمان تحویل ممکن است به دلیل پیچیدگی یا
            ثبت سند ناخوانا تغییر کند. دیجیتالی (PDF) و در نسخه کاغذی از طریق
            پست عادی می باشد. بررسی درخواست ترجمه از زمان دریافت پرداخت آغاز می
            شود. زمان تحویل اعلام شده مربوط به تحویل در نسخه دیجیتالی میباشد و
            از زمان تأیید سفارش توسط تیم ما محاسبه می شود. توجه داشته باشید که
            قیمت و زمان تحویل ممکن است به دلیل پیچیدگی یا ثبت سند ناخوانا تغییر
            کند. دیجیتالی (PDF) و در نسخه کاغذی از طریق پست عادی می باشد. بررسی
            درخواست ترجمه از زمان دریافت پرداخت آغاز می شود. زمان تحویل اعلام
            شده مربوط به تحویل در نسخه دیجیتالی میباشد و از زمان تأیید سفارش
            توسط تیم ما محاسبه می شود. توجه داشته باشید که قیمت و زمان تحویل
            ممکن است به دلیل پیچیدگی یا ثبت سند ناخوانا تغییر کند.
          </Typography>
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
          align="center"
          style={{ whiteSpace: "pre-line", marginTop: theme.spacing(2) }}
        >
          Protection des données
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          سیاست‌های حفاظت از داده‌های خصوصی
        </Typography>
        <div ref={this.privacyRef}>
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
              traduction commence à réception du paiement. Les délais de
              livraison sont calculés à partir de l’heure de validation de la
              commande par notre équipe. Les tarifs et les délais peuvent subir
              des modifications notamment en raison de la complexité ou de dépôt
              d’un document illisible.
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
        </div>
        <div
          style={{
            maxWidth: "100%",
            verticalAlign: "middle",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            marginTop: "10px",
            paddingBottom: "20px"
          }}
        >
          <Button
            onClick={() => {
              this.close();
            }}
            style={{ textTransform: "none" }}
            variant="contained"
            color="secondary"
            align={"center"}
          >
            <p>
              <span
                style={{
                  display: "block",
                  marginBottom: "0",
                  fontSize: 16,
                  paddingRight: "50px",
                  paddingLeft: "50px"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getFrenchName("close")}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "2px",
                  fontSize: "100%",
                  paddingRight: "50px",
                  paddingLeft: "50px"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getPersianName("close")}
              </Typography>
            </p>
          </Button>
        </div>
      </Fragment>
    );
  }
}
