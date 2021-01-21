export const IdentityCertificateReportData = [
  {
    type: "text",
    name: "Traduction de l’Acte d’Etat Civil (Shenasnameh)",
    isBold: true,
    size: 16
  },
  {
    type: "text",
    name:
      "[Acte de naissance, Livret de famille, Certificat de mariage, Certificat de divorce]",
    isBold: false,
    size: 12
  },
  {
    type: "text",
    name: "Armoiries de l’Iran",
    isBold: false
  },
  {
    type: "text",
    name: "République Islamique d’Iran",
    isBold: false
  },
  {
    type: "text",
    name: "Ministère de l’Intérieur",
    isBold: false
  },
  {
    type: "text",
    name: "Organisation des services d’état civil",
    isBold: false
  },
  {
    type: "data",
    name: "serial",
    align: "right"
  },
  {
    type: "text",
    name: "Photographie cachetée du titulaire",
    isBold: false
  },
  {
    type: "empty"
  },
  {
    type: "data",
    name: "nationalId"
  },
  {
    type: "data",
    name: "lastName"
  },
  {
    type: "data",
    name: "name"
  },
  {
    type: "data",
    name: "certificateId"
  },
  {
    type: "data",
    name: "birthLocation"
  },
  {
    type: "data",
    name: "birthDate"
  },
  {
    type: "data",
    name: "registrationLocation"
  },
  {
    type: "data",
    name: "registrationDate"
  },
  {
    type: "empty"
  },
  {
    type: "data",
    name: "fatherName"
  },
  {
    type: "data",
    name: "fatherId"
  },
  {
    type: "data",
    name: "fatherRegistrationLocation"
  },
  {
    type: "data",
    name: "motherName"
  },
  {
    type: "data",
    name: "motherId"
  },
  {
    type: "data",
    name: "motherRegistrationLocation"
  },
  {
    type: "text",
    name: "Signature et cachet du proposé à l’état civil",
    isBold: false
  },
  {
    type: "empty"
  },
  {
    type: "array",
    name: "spouses",
    keys: [
      "name",
      "lastName",
      "marriageDate",
      "marriageLocation",
      "birthDate",
      "birthLocation",
      "certificateId",
      "officeNumber",
      "registrationNumber"
    ]
  },
  {
    type: "empty"
  },
  {
    type: "array",
    name: "children"
  },
  {
    type: "empty"
  },
  {
    type: "array",
    name: "death"
  },
  {
    type: "empty"
  },
  {
    type: "array",
    name: "observations"
  },
  {
    type: "empty"
  }
];
