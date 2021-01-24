import { idCertificateForm } from "./form/IDCertificate";
import { idCardForm } from "./form/IDCard";
import { IdentityCertificateReportData } from "../Report/data/IdentityCertificateReportData";

export const OrderTypes = {
  ID_CERTIFICATE: {
    key: "identificationCertificate",
    form: idCertificateForm,
    reportData: IdentityCertificateReportData,
    code: "IA"
  },
  ID_CARD: {
    key: "identificationCard",
    form: idCardForm,
    code: "IC"
  }
};

export const getTypeByKey = key => {
  let obj = null;
  Object.keys(OrderTypes).map(objectKey => {
    if (OrderTypes[objectKey].code === key) obj = OrderTypes[objectKey];
  });
  return obj;
};
