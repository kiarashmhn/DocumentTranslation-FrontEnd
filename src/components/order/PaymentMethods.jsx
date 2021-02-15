import React, { Component, Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import calculateSpacing from "../home/calculateSpacing";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import * as PropTypes from "prop-types";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";
import Box from "@material-ui/core/Box";
import FileHandler from "../File/FileHandler";
import FieldInput from "../CustomInput/FieldInput";

const frenchNote =
  "* Ajouter ensuite la preuve de virement bancaire ici sur votre compte client. (Il appartient au client de transmettre la preuve du paiement en cas de virement ou d’envoi de chèque. Le justificatif de paiement permet le traitement de la traduction. Toute omission de transmission du justificatif de paiement retarderait le traitement de la traduction.) Renseignez les informations suivantes sur l’ordre de virement à votre banque :";
const persianNote =
  "* هزینه ترجمه را به حساب بانکی واریز کرده و رسید واریز را در حساب کاربری برای ما ارسال کنید. (ارسال سند پرداخت در صورت واریز در حساب بانکی یا ارسال چک به عهده مشتری است. سند پرداخت امکان شروع کار ترجمه را فراهم می کند. هرگونه عدم ارسال سند پرداخت، انجام ترجمه را به تأخیر می اندازد.) اطلاعات زیر را در دستور واریز بانکی خود می بایست ثبت کنید :";

const persianNote2 =
  "مبلغ هزینه ترجمه را در قالب چک در وجه Daniel MOVAHHEDI به آدرس زیر ارسال کنید. ";
const persianNote22 =
  "شماره سفارش را در نامه خود اضافه کنید و ترجیحاً یک عکس از چک را در حساب کاربری آپلود کنید.\n";
const frenchNote2 =
  "Envoie d’un chèque à l’ordre de Daniel MOVAHHEDI à l’adresse suivante :\n";
const address = "99 boulevard Général Vanier, 14000 CAEN \n";
const frenchNote22 =
  "Le traducteur commencera la traduction dès réception de votre chèque. Indiquer le numéro de votre commande dans votre courrier et de préférence, déposez une copie de votre chèque sur votre compte. Dès réception du frais de commande, la traduction de votre document commencera.\n";

const persianNote3 =
  "از طریق Western Union در وجه Daniel MOVAHHEDI مبلغ هزینه را پرداخت کنید.";
const frenchNote3 = "Western Union à l’ordre de Daniel MOVAHHEDI.";

const methods = [
  {
    title: "پرداخت با کارت",
    frenchTitle: "Carte bancaire",
    content: <Fragment />
  },
  {
    title: "واریز به حساب",
    frenchTitle: "Virement bancaire",
    content: <Fragment />
  },
  {
    title: "ارسال چک",
    frenchTitle: "Envoyez un chèque",
    content: <Fragment />
  },
  {
    title: "از طریق Western Union",
    frenchTitle: "Par Western Union",
    content: <Fragment />
  }
];

export default class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: null,
      files: [],
      num: ""
    };
    this.boxRef = React.createRef();
    this.fileHandlerRef = React.createRef();
  }

  handleOpen = idx => {
    this.setState(
      {
        idx: idx
      },
      () => {
        this.boxRef.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    );
  };

  render() {
    const { width, classes, id, price, code } = this.props;
    const rib = `   • montant : ${price}€
\n  • motif du virement : « francedoc${code + id} »
\n  • Informations de notre RIB :
\n      o Nom : MOVAHHEDI Daniel
\n      o IBAN : FR62 3000 2059 5100 0019 3403 P54
\n      o BIC : CRLYFRPP
`;
    return (
      <Fragment>
        <div className={classes.thirdHeader}>
          <Typography gutterBottom variant="h6" align="center">
            {getCompleteName("paymentMethods")}
          </Typography>
        </div>
        <Grid
          container
          spacing={calculateSpacing(width)}
          alignItems="center"
          justify="center"
          alignContent={"center"}
        >
          {methods.map((element, idx) => (
            <Grid
              item
              xs={6}
              md={4}
              key={"step" + idx}
              style={{ margin: "5px" }}
            >
              <Card style={{ backgroundColor: "#D2D2D2" }}>
                <CardActionArea onClick={() => this.handleOpen(idx)}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      align="center"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {element.frenchTitle}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      align="center"
                      dir="rtl"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {element.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        {this.state.idx !== null && (
          <div className={classes.thirdHeader} ref={this.boxRef}>
            <Box
              borderColor="primary.main"
              bgcolor="background.paper"
              border={2}
              style={{ padding: "10px", marginBottom: "30px" }}
              m={5}
            >
              {this.state.idx === 1 && (
                <Fragment>
                  <Typography paragraph variant="body1" align="center">
                    {frenchNote}
                  </Typography>
                  <Typography
                    paragraph
                    variant="body1"
                    align="center"
                    dir="rtl"
                  >
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
              )}
              {this.state.idx === 2 && (
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
                    dir="rtl"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {persianNote22}
                  </Typography>
                </Fragment>
              )}
              {this.state.idx === 3 && (
                <Fragment>
                  <Typography paragraph variant="body1" align="center">
                    {frenchNote3}
                  </Typography>
                  <Typography
                    paragraph
                    variant="body1"
                    align="center"
                    dir="rtl"
                  >
                    {persianNote3}
                  </Typography>
                </Fragment>
              )}
              {this.state.idx !== null && this.state.idx > 0 && (
                <Fragment>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justify="center"
                    alignContent={"center"}
                  >
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography paragraph variant="h6" align="center">
                        {getCompleteName("receiptInfo")}
                      </Typography>
                      <FileHandler
                        ref={this.fileHandlerRef}
                        orderId={this.props.id}
                        type={"payment"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FieldInput
                        name={"num"}
                        value={this.state.num}
                        onChange={event =>
                          this.setState({ num: event.target.value })
                        }
                        notRequired={true}
                      />
                    </Grid>
                  </Grid>
                  <div
                    style={{
                      maxWidth: "100%",
                      verticalAlign: "middle",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                      paddingBottom: "20px",
                      marginTop: "5px"
                    }}
                  >
                    <Button
                      onClick={() => {}}
                      variant="contained"
                      color="secondary"
                      align={"center"}
                    >
                      <p>
                        <span
                          style={{
                            display: "block",
                            marginBottom: "2px",
                            fontSize: "100%"
                          }}
                        />
                        <Typography
                          variant="body1"
                          align="center"
                          component={"span"}
                        >
                          {getPersianName("finalSubmit")}
                        </Typography>
                        <span
                          style={{
                            display: "block",
                            marginBottom: "0",
                            fontSize: 16
                          }}
                        />
                        <Typography
                          variant="body2"
                          align="center"
                          component={"span"}
                        >
                          {getFrenchName("finalSubmit")}
                        </Typography>
                      </p>
                    </Button>
                  </div>
                </Fragment>
              )}
            </Box>
          </div>
        )}
      </Fragment>
    );
  }
}
PaymentMethods.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  price: PropTypes.any.isRequired
};
