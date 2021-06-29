import { idCertificateForm } from "./form/IDCertificate";
import { idCardForm } from "./form/IDCard";
import { IdentityCertificateReportData } from "../Report/data/IdentityCertificateReportData";
import { IDCardReportData } from "../Report/data/IDCardReportData";
import { militaryServiceLicenceForm } from "./form/MilitaryServiceLicence";
import { afghanDrivingLicenceForm } from "./form/AfghanDrivingLicence";
import { TazkaraForm } from "./form/Tazkara";
import { MilitaryServiceLicenceReportData } from "../Report/data/MilitaryServiceLicenceReportData";
import { TazkaraOldForm } from "./form/TazkaraKetab";
import { DrivingLicenceForm } from "./form/DrivingLicence";
import { MarriageCertificateForm } from "./form/MarriageCertificate";
import { birthLicenseForm } from "./form/BirthLicense";
import { TazkaraBarghiForm } from "./form/TazkaraBarghi";
import { TazkaraBarghiReportData } from "../Report/data/TazkaraBarghiReportData";
import { AfghanDrivingLicenseReportData } from "../Report/data/AfghanDrivingLicenceReportData";
import { TazkaraReportData } from "../Report/data/TazkaraReportData";
import { TazkaraKetabReportData } from "../Report/data/TazkaraKetabReportData";
import { DrivingLicenseReportData } from "../Report/data/DrivingLicenseReportData";
import { BirthLicenseReportData } from "../Report/data/BirthLicenseReportData";
import { AfghanMarriageCertificateForm } from "./form/AfghanMarriageCertificate";
import { otherForm } from "./form/Other";
import { MarriageCertificateReportData } from "../Report/data/MarriageCertificateReportData";
import { AfghanMarriageCertificateReportData } from "../Report/data/AfghanMarriageCertificateReportData";
import DescriptionIcon from "@material-ui/icons/Description";
import React from "react";

export const OrderTypes = {
  ID_CERTIFICATE: {
    key: "identificationCertificate",
    form: idCertificateForm,
    reportData: IdentityCertificateReportData,
    code: "IA",
    nationality: "Iranian",
    price: 20,
    delay: 24,
    details: {
      color: "#DD2C00",
      headline: "شناسنامه",
      frenchHeadline: "Acte de naissance",
      text: "تعرفه: از ۲۰ تا ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
      frenchText: "Tarif: 20 à 25€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "0",
      smDelay: "0"
    }
  },
  ID_CARD: {
    key: "identificationCard",
    form: idCardForm,
    reportData: IDCardReportData,
    code: "IC",
    nationality: "Iranian",
    price: 20,
    delay: 24,
    details: {
      color: "#6200EA",
      headline: "کارت ملی",
      frenchHeadline: "Carte d'identité nationale",
      text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
      frenchText: "Tarif: 20€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "200",
      smDelay: "200"
    }
  },
  MILITARY_SERVICE_LICENCE: {
    key: "militaryServiceLicence",
    form: militaryServiceLicenceForm,
    reportData: MilitaryServiceLicenceReportData,
    nationality: "Iranian",
    code: "IS",
    delay: 24,
    price: 20,
    details: {
      color: "#d50000",
      headline: "کارت پایان خدمت سربازی",
      frenchHeadline: "Carte de fin de service militaire",
      text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
      frenchText: "Tarif: 20€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "0",
      smDelay: "200"
    }
  },
  AFGHAN_DRIVING_LICENCE: {
    key: "afghanDrivingLicence",
    form: afghanDrivingLicenceForm,
    reportData: AfghanDrivingLicenseReportData,
    nationality: "Afghan",
    code: "AP",
    delay: 24,
    price: 25,
    details: {
      color: "#C51162",
      headline: "لایسنس درایوری",
      frenchHeadline: "Permis de conduire",
      text: "تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
      frenchText: "Tarif: 25€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "200",
      smDelay: "200"
    }
  },
  TAZKARA: {
    key: "Tazkara",
    form: TazkaraForm,
    reportData: TazkaraReportData,
    nationality: "Afghan",
    code: "AA",
    delay: 24,
    price: 20,
    details: {
      color: "#64DD17",
      headline: "تذکره (برگه)",
      frenchHeadline: "Acte de naissance",
      text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
      frenchText: "Tarif: 20€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "400",
      smDelay: "200"
    }
  },
  TAZKARA_OLD: {
    key: "TazkaraOld",
    form: TazkaraOldForm,
    reportData: TazkaraKetabReportData,
    nationality: "Afghan",
    code: "AAB",
    delay: 24,
    price: 20,
    details: {
      color: "#0d133b",
      headline: "تذکره (کتابچه)",
      frenchHeadline: "Acte de naissance",
      text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
      frenchText: "Tarif: 20€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "400",
      smDelay: "200"
    }
  },
  DRIVING_LICENCE: {
    key: "DrivingLicence",
    form: DrivingLicenceForm,
    reportData: DrivingLicenseReportData,
    nationality: "Iranian",
    code: "IP",
    delay: 24,
    price: 20,
    details: {
      color: "#0091EA",
      headline: "گواهینامه",
      frenchHeadline: "Permis de conduire",
      text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
      frenchText: "Tarif: 20€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "400",
      smDelay: "0"
    }
  },
  MARRIAGE_CERTIFICATE: {
    key: "marriageCertificate",
    form: MarriageCertificateForm,
    reportData: MarriageCertificateReportData,
    nationality: "Iranian",
    code: "IM",
    delay: 48,
    price: 60,
    details: {
      color: "#00C853",
      headline: "عقدنامه",
      frenchHeadline: "Livret de mariage",
      text: "تعرفه: ۶۰ یورو\n زمان تحویل: ۴۸ ساعت",
      frenchText: "Tarif: 50€ \n Délai de livraison: 48h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "0",
      smDelay: "0"
    }
  },
  AFGHAN_MARRIAGE_CERTIFICATE: {
    key: "afghanMarriageCertificate",
    form: AfghanMarriageCertificateForm,
    reportData: AfghanMarriageCertificateReportData,
    nationality: "Afghan",
    code: "AM",
    delay: 48,
    price: 50,
    details: {
      color: "#304FFE",
      headline: "نکاح نامه",
      frenchHeadline: "Certificat de mariage",
      text: "تعرفه: ۵۰ یورو\n زمان تحویل: ۴۸ ساعت",
      frenchText: "Tarif: 50€ \n Délai de livraison: 48h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "0",
      smDelay: "0"
    }
  },
  BIRTH_LICENSE: {
    key: "birthLicense",
    form: birthLicenseForm,
    reportData: BirthLicenseReportData,
    nationality: "Afghan",
    code: "AN",
    delay: 24,
    price: 25,
    details: {
      color: "#00B8D4",
      headline: "کارت ثبت تولدات",
      frenchHeadline: "Carte d’enregistrement de naissance",
      text: "تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
      frenchText: "Tarif: 25€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "400",
      smDelay: "0"
    }
  },
  TAZKARA_BARGHI: {
    key: "TazkaraBarghi",
    form: TazkaraBarghiForm,
    reportData: TazkaraBarghiReportData,
    nationality: "Afghan",
    code: "AC",
    delay: 24,
    price: 25,
    details: {
      color: "#dbc858",
      headline: "تذکره تابعیت برقی",
      frenchHeadline: "Carte d'Identité Nationale afghane",
      text: "تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت \n ",
      frenchText: "Tarif: 25€ \n Délai de livraison: 24h",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "0",
      smDelay: "0"
    }
  },
  OTHER_DOCUMENTS: {
    key: "other",
    form: otherForm,
    nationality: "BOTH",
    code: "DD",
    details: {
      color: "#db8758",
      headline: "متون، اسناد و مدارک دیگر",
      frenchHeadline: "Document divers",
      text: "تعرفه: درخواست پیش فاکتور کنید\n زمان تحویل: با توجه به مقدار کار",
      frenchText:
        "Tarif: demander un devis \n Délai : en fonction de la difficulté linguistique",
      icon: <DescriptionIcon style={{ fontSize: 30 }} />,
      mdDelay: "400",
      smDelay: "0"
    }
  }
};

export const getTypeByKey = key => {
  let obj = null;
  Object.keys(OrderTypes).map(objectKey => {
    if (OrderTypes[objectKey].code === key) obj = OrderTypes[objectKey];
  });
  return obj;
};

export const getType = key => {
  let obj = null;
  Object.keys(OrderTypes).map(objectKey => {
    if (OrderTypes[objectKey].key === key) {
      obj = OrderTypes[objectKey];
    }
  });
  return obj;
};
