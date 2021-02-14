import { idCertificateForm } from "./form/IDCertificate";
import { idCardForm } from "./form/IDCard";
import { IdentityCertificateReportData } from "../Report/data/IdentityCertificateReportData";
import { IDCardReportData } from "../Report/data/IDCardReportData";

export const OrderTypes = {
  ID_CERTIFICATE: {
    key: "identificationCertificate",
    form: idCertificateForm,
    reportData: IdentityCertificateReportData,
    code: "IA",
    price: 25
  },
  ID_CARD: {
    key: "identificationCard",
    form: idCardForm,
    reportData: IDCardReportData,
    code: "IC",
    price: 20
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
