import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import calculateSpacing from "./calculateSpacing";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";

const helpSteps = [
  {
    persian: {
      title: "مرحله ۱: ایجاد حساب شخصی",
      details:
        "اطلاعات خود را وارد کنید.  نام کاربری و رمز خود را انتخاب کنید. یک حساب کاربری برای شما ایجاد میشود که از طریق آن میتوانید درخواست ترجمه مدارک دهید، با ما تبادل اطلاعات کنید، پیش فاکتور دریافت کنید، هزینه ترجمه را پرداخت کنید و نسخه الکترونیکی ترجمه آماده شده را بارگیری کنید."
    },
    french: {
      title: "Étape 1: Créez un compte personnel",
      details:
        "Choisissez votre identifiant et votre mot de passe. Ce compte vous permet ensuite de demander la traduction de vos documents, d’échanger des informations avec nous, de recevoir un devis, de payer les frais de traduction et de télécharger la version électronique de la traduction réalisée."
    }
  },
  {
    persian: {
      title: "مرحله ۲: آپلود سند و پرکردن فرم مربوطه",
      details:
        "در این مرحله نوع مدرک خود (تزکره، شناسنامه، گواهینامه، لیسانس درایوری، نکاح نامه، سند ازدواج، کارت ملی...)  را انتخاب کنید. سپس مدرک را آپلود، فرم مربوطه را با دقت پر و درخواست خود را ثبت کنید."
    },
    french: {
      title: "Étape 2: enregistrer votre demande",
      details:
        "Choisissez le type de document à traduire (acte de naissance, carte d'identité, permis de conduire, certificat de mariage, etc.), télécharger une copie de votre document (au format jpg, png, pdf ou zip) et remplissez soigneusement le formulaire correspondant. Assurez-vous de la parfaite lisibilité des documents et de l’exactitude des informations saisies."
    }
  },
  {
    persian: {
      title: "مرحله ۳: تأیید و پذیرش درخواست ترجمه",
      details:
        "پس از ثبت نهایی، ما مدرک و اطلاعات وارده را بررسی می کنیم. اگر کامل باشد در خواست ترجمه را تأیید میکنیم. سپس به شما پیش فاکتور می دهیم ،یعنی هزینه درخواست ترجمه را اطلاع می دهیم.  میتوانید لیست هزینه ترجمه برای مدارک متداول مثل شناسنامه، تذکره، گواهینامه، لیسانس درایوری و از این قیبل را در اینجا ببینید.  در این مرحله اگر نقص و ایرادی در درخواست وجود داشته باشد با شما در حساب کاربری تماس گرفته میشود. "
    },
    french: {
      title: "Étape 3: validation de la demande de traduction",
      details:
        "Après l'enregistrement définitif de la demande, nous vérifions le document et les informations reçues. S'ils sont complets, nous validons la demande de traduction. Nous vous remettrons ensuite un devis. Vous pouvez consulter la liste des frais de traduction pour les documents courants ici. A ce stade, s'il y a un défaut dans le document, vous serez contacté sur votre compte."
    }
  },
  {
    persian: {
      title: "مرحله ۴: پرداخت هزینه ترجمه",
      details:
        "میتوانید به روشهای زیر در فرانسه هزینه ترجمه خود را پرداخت کنید : \n" +
        "-\tمبلغ هزینه ترجمه را به حساب زیر واریز کرده و رسید یا شماره واریز را برایمان در حساب کاربری خود ارسال کنید.\n" +
        "-\tمبلغ هزینه ترجمه را در قالب چک به آدرس ما ارسال کنید.\n" +
        "-\tهزینه را با کارت پرداخت کنید.\n" +
        "به محض دریافت هزینه، کار ترجمه مدرک شما آغاز خواهد شد. \n"
    },
    french: {
      title: "Étape 4: Payez la commande de traduction",
      details:
        "Vous pouvez payer votre commande de traduction assermentée en France par un des moyens de paiement suivants : \n" +
        "- par un virement bancaire. Dans ce cas, envoyez-nous le reçu ou le numéro de virement par votre compte.\n" +
        "- par l’envoie d’un chèque à notre adresse. Le traducteur commencera votre traduction dès réception du chèque. Indiquer le numéro de votre commande dans votre courrier et de préférence, déposez une copie de votre chèque sur votre compte.\n" +
        "-  par carte bancaire.\n" +
        "Dès réception du frais de commande, la traduction de votre document commencera.\n"
    }
  },
  {
    persian: {
      title: "مرحله ۵: دریافت ترجمه",
      details:
        "ترجمه انجام شده در حساب شخصی شما در قالب فایل بصورت رنگی قابل رویت و دانلود میباشد. همچنین یک نسخه کاغذی آن با پست به آدرس پستی شما ارسال میشود.\n" +
        " ترجمه مدارک متداول، معمولا 24 ساعت بعد از دریافت هزینه، آماده و در حساب کاربردی شما قابل دانلود می باشند. کمتر از سه روز غیر تعطیل مدارک به آدرس شما در فرانسه ارسال خواهند شد. امکان ارسال با پست سفارشی نیز در صورت پرداخت هزینه نیز فراهم میباشد.\n"
    },
    french: {
      title: "Étape 5: Réception de la traduction",
      details:
        "La traduction vous sera disponible sur votre compte et elle peut être téléchargée en couleur au format PDF. La version papier (original) vous sera également envoyée par courrier à votre adresse. Le délai de traduction est de 24 heures pour les documents courants et de 2 à 3 jours pour d’autres types de documents."
    }
  }
];

const styles = theme => ({
  termsConditionsListitem: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1)
  },
  dialogActions: {
    justifyContent: "flex-start",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  backIcon: {
    marginRight: theme.spacing(1)
  }
});

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openIdentityDialog: false,
      isLoading: false,
      idx: 0
    };
  }

  handleOpenDialog = idx => {
    this.setState({
      openIdentityDialog: true,
      idx: idx
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openIdentityDialog: false
    });
  };

  render() {
    const { width } = this.props;
    return (
      <Fragment>
        <Grid
          container
          spacing={calculateSpacing(width)}
          alignItems="center"
          direction="column"
          dir={this.props.language === "persian" ? "rtl" : "ltr"}
          justify="center"
          alignContent={"center"}
        >
          {helpSteps.map((element, idx) => (
            <Grid item xs={6} md={4} key={"step" + idx}>
              <Card style={{ backgroundColor: "#00B8D4" }}>
                <CardActionArea onClick={() => this.handleOpenDialog(idx)}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {element[this.props.language].title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              {idx < helpSteps.length - 1 && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ArrowDropDownCircleIcon style={{ color: "#00B8D4" }} />
                </div>
              )}
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={this.state.openIdentityDialog}
          scroll="paper"
          onClose={this.handleCloseDialog}
          hideBackdrop
          dir={this.props.language === "persian" ? "rtl" : "ltr"}
        >
          <DialogActions>
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={this.handleCloseDialog}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <Typography
              variant="h6"
              color="primary"
              paragraph
              style={{ whiteSpace: "pre-line" }}
            >
              {helpSteps[this.state.idx][this.props.language].title}
            </Typography>
            <Typography paragraph style={{ whiteSpace: "pre-line" }}>
              {helpSteps[this.state.idx][this.props.language].details}
            </Typography>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
Help.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object,
  language: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Help);
