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

export const OrderTypes = {
  ID_CERTIFICATE: {
    key: "identificationCertificate",
    form: idCertificateForm,
    reportData: IdentityCertificateReportData,
    code: "IA",
    nationality: "Iranian",
    price: 25,
    delay: 24
  },
  ID_CARD: {
    key: "identificationCard",
    form: idCardForm,
    reportData: IDCardReportData,
    code: "IC",
    nationality: "Iranian",
    price: 20,
    delay: 24
  },
  MILITARY_SERVICE_LICENCE: {
    key: "militaryServiceLicence",
    form: militaryServiceLicenceForm,
    reportData: MilitaryServiceLicenceReportData,
    nationality: "Iranian",
    code: "IS",
    delay: 24,
    price: 20
  },
  AFGHAN_DRIVING_LICENCE: {
    key: "afghanDrivingLicence",
    form: afghanDrivingLicenceForm,
    reportData: AfghanDrivingLicenseReportData,
    nationality: "Afghan",
    code: "AP",
    delay: 24,
    price: 25
  },
  TAZKARA: {
    key: "Tazkara",
    form: TazkaraForm,
    reportData: TazkaraReportData,
    nationality: "Afghan",
    code: "AA",
    delay: 24,
    price: 20
  },
  TAZKARA_OLD: {
    key: "TazkaraOld",
    form: TazkaraOldForm,
    reportData: TazkaraKetabReportData,
    nationality: "Afghan",
    code: "AAB",
    delay: 24,
    price: 20
  },
  DRIVING_LICENCE: {
    key: "DrivingLicence",
    form: DrivingLicenceForm,
    reportData: DrivingLicenseReportData,
    nationality: "Iranian",
    code: "IP",
    delay: 24,
    price: 20
  },
  MARRIAGE_CERTIFICATE: {
    key: "marriageCertificate",
    form: MarriageCertificateForm,
    nationality: "Iranian",
    code: "IM",
    delay: 48,
    price: 50
  },
  AFGHAN_MARRIAGE_CERTIFICATE: {
    key: "afghanMarriageCertificate",
    form: AfghanMarriageCertificateForm,
    nationality: "Afghan",
    code: "AM",
    delay: 48,
    price: 50
  },
  BIRTH_LICENSE: {
    key: "birthLicense",
    form: birthLicenseForm,
    reportData: BirthLicenseReportData,
    nationality: "Afghan",
    code: "AN",
    delay: 24,
    price: 25
  },
  TAZKARA_BARGHI: {
    key: "TazkaraBarghi",
    form: TazkaraBarghiForm,
    reportData: TazkaraBarghiReportData,
    nationality: "Afghan",
    code: "AC",
    delay: 24,
    price: 20
  },
  OTHER_DOCUMENTS: {
    key: "other",
    form: otherForm,
    nationality: "BOTH",
    code: "DD"
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
