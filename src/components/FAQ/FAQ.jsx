import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const questions = [
  {
    persian: "تفاوت بین ترجمه ساده و ترجمه تأیید شده (رسمی) چیست؟",
    french:
      "Quelle est la différence entre une traduction simple et une traduction certifiée (assermentée) ?",
    pAns:
      "ترجمه ساده توسط هر کسی قابل انجام است و هیچ ارزش قانونی ندارد. در حالی که ترجمه رسمی فقط توسط یک مترجم رسمی (قسم خورده) دادگستری فرانسه انجام می شود و مورد قبول سازمانها و ادارات فرانسه می باشد.",
    fAns:
      "Une traduction simple n’a aucune valeur juridique et peut être effectuée par n’importe qui. Au contraire, une traduction assermentée (également appelée traduction certifiée) ne peut être effectuée que par un Expert traducteur (assermenté) agréé inscrit auprès de la Cour d'appel et apporte un caractère officiel au document traduit et garantit sa totale conformité avec le document d'origine."
  },
  {
    persian: "چگونه می توانم یک سوال بپرسم؟",
    french: "Comment puis-je poser une question ?",
    pAns:
      'یک حساب کاربری ایجاد کنید. در حساب کاربری، نوع سند را انتخاب کنید، به عنوان مثال "شناسنامه". سند را برای ترجمه بارگیری کنید یا یک مرحله از فرم مربوطه را تکمیل کنید و سپس دکمه "ذخیره اطلاعات" را فشار دهید. سیستم به طور خودکار یک خط در لیست سفارش ها اضافه می کند که امکان مشاهده، اصلاح یا لغو سفارش، در هر زمان قبل از تأیید پرداخت، را به شما می دهد. در همین مکان، یعنی لیست سفارش ها و در خط سفارش مورد نظر، محلی برای تبادل پیام پیش بینی شده است که به شما اجازه پرسیدن سوأل در مورد همان سفارش را می دهد.',
    fAns:
      "Créer un compte. Connectez-vous à votre espace client. Sélectionnez un type de document, par exemple ‘Acte de naissance’. Téléchargez le document à traduire ou remplissez une étape de formulaire correspondant et puis appuyez sur le bouton ‘Conserver’. Le système ajoute automatiquement une ligne de commande qui peut être consultée, modifiée ou annulée à tout moment avant la confirmation de paiement via la liste de commandes. Toujours à partir de la liste de commandes et sur la même ligne que la commande en question, vous avez à votre disposition une interface d’échanges qui vous permettra de communiquer avec nous au sujet de la commande en question."
  },
  {
    persian: "چگونه می توانم یک پیش فاکتور درخواست بدهم؟",
    french: "Comment dois-je procéder pour obtenir un devis?",
    pAns:
      "پیش فاکتور رایگان است. ابتدا باید یک حساب کاربری ایجاد کنید. در حساب کاربری، فرم اختصاص داده شده به اسناد دیگر را انتخاب کنید. سپس، سند خود را آپلود کنید و اطلاعات و اسنادی را که برای ترجمه سند مفید می دانید ، اضافه کنید. ما درخواست شما را بررسی می کنیم و بلافاصله یک پیش فاکتور از طریق حساب کاربری > لیست سفارشات در اختیار شما قرار می دهیم. سپس، درصورتیکه با پیش فاکتور موافق بودید آن را تایید می کنید و به مرحله انتخاب روش پرداخت می روید. برآورد هزینه ترجمه با توجه به تعداد لغات، پیچیدگی متن و نوع سند محاسبه می شود.",
    fAns:
      "Le devis est gratuit. Il faut d’abord créer un compte client. Dans votre compte, sélectionnez le formulaire dédié à des documents divers. Puis, sélectionnez le document sur votre disque dur et indiquez les informations et les documents que vous jugerez utile à la réalisation de traduction de votre document.  Nous analysons votre demande et vous remettrons aussitôt un devis qui sera accessible via votre compte client > liste commandes. Vous aurez ensuite la possibilité de valider le devis et aller à l'étape de sélection du moyen de paiement. Le devis est calculé en fonction de la longueur du document à traduire, le type de document à traduire et la technicité du document."
  },
  {
    persian: "آیا ترجمه من توسط یک مترجم رسمی (قسم خورده) انجام می شود ؟ ",
    french:
      "Ma traduction certifiée sera-t-elle effectuée par un Expert traducteur (assermenté) ?",
    pAns:
      "بله ، فرانسدک خدمات ترجمه رسمی ارائه می دهد، بنابراین ترجمه ها توسط یک مترجم رسمی (قسم خورده) که در لیست دادگستری فرانسه ثبت شده اند انجام می شود. هنگامی که ترجمه خود را دریافت می کنید، مهر و امضای مترجم رسمی را بر روی آن مشاهده خواهید کرد و می توانید نام مترجم را در وب سایت دادگاه تجدیدنظر (دادگستری) فرانسه پیدا کنید.",
    fAns:
      "Oui, francedoc.fr propose des traductions assermentées (certifiée), donc faites par un Expert traducteur (assermenté) auprès d’une cour d’appel en France. Lorsque vous recevrez votre traduction assermentée, vous y verrez le cachet et la signature du traducteur assermenté et pourrez vérifier son inscription sur le site de la Cour d’appel."
  },
  {
    persian: "آیا برای انجام ترجمه اصل سند را ارسال کنم؟ ",
    french:
      "Dois-je envoyer le doucement original pour effectuer la traduction ?",
    pAns:
      "نه ولی توصیه می شود اصل سند را نگهداری کنید. برای انجام ترجمه رسمی، فقط به اسکن با کیفیت و خوانا نسخه اصلی احتیاج می باشد. ما کار را از راه دور انجام می دهیم.",
    fAns:
      "Non, mais nous vous conseillons de toujours le conserver. Pour effectuer une traduction assermentée, nous n’aurons besoin que d’une copie scannée (très bonne qualité) de l’original."
  },
  {
    persian: "آیا قیمت های اعلامی، هزینه ارسال را شامل می شود؟ ",
    french: "Le prix indiqué comprend-il le frais de livraison ? ",
    pAns:
      "قیمت های ما شامل تحویل یک نسخه PDF از طریق حساب کاربری و یک نسخه کاغذی از طریق پست معمولی (تمبر سبز) است. توجه داشته باشید که فراسدک هیچگونه مسئولیتی در قبال عدم وصول ترجمه از طریق پست بر عهده نمی گیرد و ارسال مجدد ترجمه منوط به پرداخت کل هزینه ترجمه می باشد. برای اطمینان بیشتر از دریافت نسخه کاغذی ترجمه خود، می توانید درخواست ارسال آنرا با پرداخت هزینه اضافی با  پست سفارشی (+7 یورو) یا قابل پیگیری (+2 یورو) در مرحله پرداخت بدهید.",
    fAns:
      "Nos prix comprennent la livraison d’une version PDF via votre espace client et d’une version papier en lettre simple (timbre vert). francedoc.fr se dégage de toute responsabilité si le client ne reçoit pas le courrier et toute demande de nouvel envoi postal fera l’objet d’une nouvelle facturation. Afin d’assurer la bonne réception de votre commande, vous pouvez choisir l’envoi en lettre recommandée ou suivie en payant un supplément (respectivement +7 et +2 euros)."
  },
  {
    persian: "آیا امکان دریافت ترجمه در خارج از فرانسه وجود دارد ؟  ",
    french: "Est-il possible de recevoir ma traduction à l’étranger ?",
    pAns:
      "می توانید از طریق حساب کاربری نسخه PDF را در هر کجا دانلود کنید، اما نسخه کاغذی فقط به یک آدرس پستی در فرانسه ارسال می شود.",
    fAns:
      "Vous pouvez télécharger en PDF via votre espace client mais la version papier ne sera envoyée qu’à une adresse postale en France. "
  },
  {
    persian:
      "چه زمانی پرداخت انجام دهم و چه روش های پرداخت در سایت شما پیشنهاد می شود؟ ",
    french:
      "Quand dois-je effectuer le paiement et quels sont les modes de paiement disponibles ?",
    pAns:
      "پرداخت به معنی تأیید سفارش می باشد. از لحظه تأیید پرداخت، سفارش قابل اصلاح یا لغو نمی باشد. ما کار ترجمه را تنها بعد از دریافت پرداخت شروع می کنیم.\n" +
      "\n" +
      "روشهای زیر برای پرداخت هزینه ترجمه فراهم می باشد : پرداخت با کارت اعتباری، واریز به حساب بانکی یا ارسال چک. در دو مورد آخر، حتما سند واریز یا عکس چک را برای ما در مرحله پرداخت ارسال کنید.\n",
    fAns:
      "Le paiement doit être effectué lors de la confirmation de la commande. A partir de ce moment (confirmation de paiement), la commande ne peut plus être modifiée ou annulée. Nous ne commençons le travail qu’après réception de votre paiement. \n" +
      "\n" +
      "Quant aux modes de paiement disponibles, nous acceptons : le paiement par carte bancaire, par virement bancaire ou par chèque. Dans les deux derniers cas, vous devez nous transmettre la preuve du paiement."
  },
  {
    persian: "ترجمه رسمی در کجا اعتبار دارد ؟",
    french: "Où ma traduction certifiée est-elle valable ?",
    pAns:
      "اگرچه در تعداد زیادی از کشورهای خارجی پذیرفته می شود، اما ما فقط می توانیم اعتبار آنها را در خاک فرانسه تضمین کنیم، زیرا مترجمان رسمی ما در لیست دادگاه های تجدید نظر (دادگستری) فرانسه می باشند. همچنین، از نظر قانونی، در تمام سفارتخانه های فرانسه در کشورهای دیگر نیز معتبر می باشند (برای اطمینان از این موضوع قبل از پرداخت، از سفارت استعلام کنید).",
    fAns:
      "Bien qu’elles soient acceptées comme valables dans un grand nombre de pays étrangers, nous ne pouvons garantir leur validité que sur le territoire français, car nos traducteurs assermentés sont certifiés par une Cour d’appel en France. "
  },
  {
    persian:
      "من به یک نسخه کاغذی اضافی نیاز دارم، چگونه می توانم آن را درخواست کنم ؟ ",
    french:
      "J’ai besoin d’une copie papier supplémentaire, comment puis-je la demander ?",
    pAns:
      "به حساب کاربری خود وارد شوید، سفارش مورد نظر را پیدا کنید و درخواست خود را از طریق پیام رسان اختصاص داده شده به آن سفارش ما بنویسید. برای ارسال مجدد یک سفارش حداقل هزینه، 15 یورو  یا نیمی از هزینه ترجمه اولیه بعلاوه هزینه ارسال در نظر گرفته خواهد شد.",
    fAns:
      "Il suffit d’aller sur votre compte client, retrouver la commande en question et nous écrire votre demande par l’interface d’échange dédiée à cette commande. Un nouvel envoi en lettre simple vous sera facturé à un coût minimum de 15 euros (hors taxes), ou à la moitié du coût de la traduction assermentée initiale, plus les frais de livraison correspondants, sauf en cas d’un devis spécifique."
  },
  {
    persian: "آیا ترجمه رسمی همان فرم اصلی سند اصلی را خواهد داشت ؟ ",
    french:
      "Ma traduction certifiée aura-t-elle le même format que le document original ?",
    pAns:
      "تنظیم فرم و قالب ترجمه بنا به نظر مترجم رسمی می باشد و وی در انتخاب فرم و قالب آزاد است.",
    fAns:
      "La réglementation relative aux traductions assermentées est basée sur le contenu, et non sur le format ou la structure, de sorte que chaque traducteur assermenté est libre de définir le format de son choix."
  }
];

export default class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: -1
    };
  }

  render() {
    return (
      <div>
        <Typography
          variant="h5"
          dir={"rtl"}
          align={"center"}
          style={{ marginBottom: "30px", marginTop: "30px" }}
        >
          <Box
            style={{
              fontWeight: "bold"
            }}
          >
            Foire aux questions (FAQ)
          </Box>
          <Box
            style={{
              fontWeight: "bold"
            }}
          >
            سوالات متداول
          </Box>
        </Typography>
        {questions.map((q, idx) => (
          <div key={idx + "faq"}>
            <Box
              borderColor="primary.main"
              border={2}
              style={{
                borderRadius: 5,
                marginRight: "15px",
                marginLeft: "15px",
                marginBottom: "15px"
              }}
            >
              <Card>
                <CardActionArea
                  onClick={() => {
                    this.setState({ num: idx });
                  }}
                >
                  <CardContent>
                    <Typography align={"center"} component={"div"}>
                      <div dir={"ltr"}>{q.french}</div>
                      <div>{q.persian}</div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            {this.state.num === idx && (
              <Box
                borderColor="secondary.main"
                bgcolor="background.paper"
                border={2}
                style={{
                  padding: "10px",
                  marginBottom: "15px",
                  marginTop: "15px",
                  borderRadius: 5
                }}
                m={3}
              >
                <div>{q.fAns}</div>
                <div dir={"rtl"}>{q.pAns}</div>
              </Box>
            )}
          </div>
        ))}
      </div>
    );
  }
}
