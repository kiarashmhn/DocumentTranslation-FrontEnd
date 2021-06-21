import { getFrenchName } from "../../../Dictionary.js";
import { titleSize } from "../ExcelUtil";
export function AfghanMarriageCertificateReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction d’un certificat de mariage afghan",
      isBold: true,
      size: titleSize
    },
    {
      type: "text",
      name:
        "Numéro d’enregistrement général : " + data.generalRegistrationNumber,
      isBold: true
    },
    {
      type: "text",
      name:
        "Numéro d’enregistrement spécifique : " +
        data.specificRegistrationNumber,
      isBold: true
    },
    {
      type: "text",
      name: "Numéro de série : " + data.serialNumber1,
      isBold: true
    },
    {
      type: "text",
      name:
        "Tarif du certificat de mariage : " +
        data.tarrif +
        " Afghani ( a été réglé )",
      isBold: true
    },
    {
      type: "text",
      name: "Date d’émission : " + data.issueDate1,
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "Informations sur l’enregistrement de l’acte de naissance (Taskera)",
      isBold: true
    },
    {
      type: "text",
      name:
        "Carte d’enregistrement de naissance (Description de la personne concernée) ",
      isBold: true
    },
    {
      type: "data",
      data: data.aName,
      name: "aName"
    },
    {
      type: "data",
      data: data.aLastName,
      name: "aLastName"
    },

    {
      type: "data",
      data: data.valad,
      name: "valad"
    },

    {
      type: "data",
      data: data.valadiat,
      name: "valadiat"
    },
    {
      type: "data",
      data: data.motherName,
      name: "motherName"
    },
    {
      type: "data",
      data: data.birthDate,
      name: "birthDate"
    },
    {
      type: "data",
      data: getFrenchName(data.gender),
      name: "gender"
    },

    {
      type: "data",
      data: data.idNumber,
      name: "idNumber"
    },
    {
      type: "data",
      data: data.issueDate,
      name: "issueDate"
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Signature ou empreinte digitale du titulaire du passeport :",
      isBold: true,
      size: 10
    }
  ];
}
