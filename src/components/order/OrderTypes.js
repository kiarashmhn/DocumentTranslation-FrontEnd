import { idCertificateForm } from "./form/IDCertificate";
import { idCardForm } from "./form/IDCard";

export const OrderTypes = {
  ID_CERTIFICATE: {
    key: "identificationCertificate",
    form: idCertificateForm
  },
  ID_CARD: {
    key: "identificationCard",
    form: idCardForm
  }
};

export const getTypeByKey = key => {
  let obj = null;
  Object.keys(OrderTypes).map(objectKey => {
    if (OrderTypes[objectKey].key === key) obj = OrderTypes[objectKey];
  });
  return obj;
};
