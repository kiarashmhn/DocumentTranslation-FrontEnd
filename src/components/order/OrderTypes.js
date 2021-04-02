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

export const OrderTypes = {
  ID_CERTIFICATE: {
    key: "identificationCertificate",
    form: idCertificateForm,
    reportData: IdentityCertificateReportData,
    code: "IA",
    type: "Iranian",
    price: 25
  },
  ID_CARD: {
    key: "identificationCard",
    form: idCardForm,
    reportData: IDCardReportData,
    code: "IC",
    type: "Iranian",
    price: 20
  },
  MILITARY_SERVICE_LICENCE: {
    key: "militaryServiceLicence",
    form: militaryServiceLicenceForm,
    reportData: MilitaryServiceLicenceReportData,
    type: "Iranian",
    code: "MSL"
  },
  AFGHAN_DRIVING_LICENCE: {
    key: "afghanDrivingLicence",
    form: afghanDrivingLicenceForm,
    type: "Afghan",
    code: "ADL"
  },
  TAZKARA: {
    key: "Tazkara",
    form: TazkaraForm,
    type: "Afghan",
    code: "TZ"
  },
  TAZKARA_OLD: {
    key: "TazkaraOld",
    form: TazkaraOldForm,
    type: "Afghan",
    code: "TZO"
  },
  DRIVING_LICENCE: {
    key: "DrivingLicence",
    form: DrivingLicenceForm,
    type: "Iranian",
    code: "DL"
  },
  MARRIAGE_CERTIFICATE: {
    key: "marriageCertificate",
    form: MarriageCertificateForm,
    type: "Iranian",
    code: "MC"
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
    if (OrderTypes[objectKey].key === key) obj = OrderTypes[objectKey];
  });
  return obj;
};
