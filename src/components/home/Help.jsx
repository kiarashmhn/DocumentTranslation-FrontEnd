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
        "در منو بالای صفحه، دکمه « ثبت‌نام» را کلیک کنید. ایمیل خود را وارد و رمز خود را انتخاب کنید. یک حساب کاربری برای شما ایجاد می‌شود که از طریق آن می‌توانید درخواست ترجمه مدارک دهید، با ما تبادل اطلاعات کنید، پیش فاکتور دریافت کنید، هزینه ترجمه را پرداخت کنید و نسخه الکترونیکی ترجمه آماده شده را بارگیری کنید."
    },
    french: {
      title: "Étape 1: Créez un compte client",
      details:
        "Depuis la page d’accueil du site, cliquez sur le bouton « S’inscrire ». Saisissez votre adresse e-mail et enregistrez un mot de passe. Votre compte sera actif instantanément et vous pourrez accéder à tous les services en ligne : demander une traduction ou un devis, échanger avec nous, payer les frais de traduction, télécharger la version électronique de la traduction réalisée, …"
    }
  },
  {
    persian: {
      title: "مرحله ۲: آپلود سند و پرکردن فرم مربوطه",
      details:
        "در این مرحله نوع مدرک خود (تذکره، شناسنامه، گواهینامه، لیسانس درایوری، نکاح‌نامه، سند ازدواج، کارت ملی...)  را انتخاب کنید. سپس مدرک خود را با کیفیت بالا و خوانا آپلود، فرم مربوطه را با دقت پر و درخواست خود را ثبت کنید. اگر نیاز به ترجمه مدرکی داشتید که در لیست ما نبود، فرم « مدارک دیگر» را برای درخواست پیش‌فاکتور (قیمت و زمان لازم ترجمه) انتخاب کنید."
    },
    french: {
      title: "Étape 2: Enregistrer votre demande",
      details:
        "Choisissez le type de document à traduire (acte de naissance, carte d'identité, permis de conduire, certificat de mariage, etc.), téléchargez une copie de votre document et remplissez soigneusement le formulaire correspondant. Assurez-vous de la parfaite lisibilité des documents et de l’exactitude des informations saisies. Si le type de votre document ne faisait pas partie de notre liste, sélectionnez le formulaire dédié à des « documents divers » pour demander un devis."
    }
  },
  {
    persian: {
      title: "مرحله ۳: پرداخت هزینه ترجمه",
      details:
        "میتوانید به روشهای زیر در فرانسه هزینه ترجمه خود را پرداخت کنید : \n" +
        "-\tهزینه را با کارت پرداخت کنید.\n" +
        "-\tمبلغ هزینه ترجمه را به حساب بانکی ما واریز کرده و رسید یا شماره واریز را برایمان در حساب کاربری خود ارسال کنید.\n" +
        "-\tمبلغ هزینه ترجمه را در قالب چک به آدرس ما ارسال کنید.\n" +
        "به محض دریافت هزینه، کار ترجمه مدرک شما آغاز خواهد شد. \n"
    },
    french: {
      title: "Étape 3: Payez la commande de traduction",
      details:
        "Vous pouvez payer votre commande de traduction assermentée par un des moyens de paiement suivants : \n" +
        "- par carte bancaire.\n" +
        "- par un virement bancaire. Dans ce cas, faites-nous parvenir le reçu ou le numéro de virement via votre compte client.\n" +
        "- par l’envoie d’un chèque à notre adresse. Indiquer le numéro de votre commande dans votre courrier et de préférence, faites-nous parvenir une copie de votre chèque via votre compte client.\n" +
        "Dès réception du frais de commande, la traduction de votre document commencera.\n"
    }
  },
  {
    persian: {
      title: "مرحله ۴: تأیید و پذیرش درخواست ترجمه",
      details:
        "پس از پرداخت، ما مدرک و اطلاعات وارده را بررسی می‌کنیم. اگر کامل باشد در خواست ترجمه را تأیید می‌کنیم. در این مرحله اگر نقص و ایرادی در درخواست ترجمه وجود داشته باشد (مثلا سند ناخوانا باشد) با شما در حساب کاربری تماس گرفته می‌شود."
    },
    french: {
      title: "Étape 4: Validation de la demande de traduction",
      details:
        "Après le paiement, nous vérifions le document et les informations saisies. S'ils sont complets, nous validons la demande de traduction et s'il y a un défaut, vous serez contacté via la messagerie de votre compte client."
    }
  },
  {
    persian: {
      title: "مرحله ۵: دریافت ترجمه",
      details:
        "نسخه الکترونیکی ترجمه مدارک متداول معمولا 24 ساعت بعد از تأیید کامل بودن درخواست در حساب کاربری قابل رویت و دانلود می‌باشد. همچنین، نسخه کاغذی ترجمه را کمتر از سه روز غیرتعطیل در آدرس خود دریافت خواهید کرد. امکان ارسال با پست سفارشی نیز در صورت پرداخت هزینه اضافه فراهم می‌باشد."
    },
    french: {
      title: "Étape 5: Réception de la traduction",
      details:
        "La traduction vous sera livrée et téléchargeable en version PDF sur votre compte dans le délai convenu (en général, 24h pour les documents courants). La version papier (original) vous sera également envoyée par courrier simple à votre adresse (il est possible d’envoyer en lettre recommandée ou suivie en payant un supplément)."
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
