import { idCertificateForm } from "./IDCertificate";

export const OrderTypes = {
  ID_CERTIFICATE: {
    key: "identificationCertificate",
    persianName: "شناسنامه",
    frenchName: "Acte de naissance",
    completeName: "Acte de naissance / شناسنامه",
    form: idCertificateForm
  }
};

export const getTypeByKey = key => {
  let obj = null;
  Object.keys(OrderTypes).map(objectKey => {
    if (OrderTypes[objectKey].key === key) obj = OrderTypes[objectKey];
  });
  return obj;
};
