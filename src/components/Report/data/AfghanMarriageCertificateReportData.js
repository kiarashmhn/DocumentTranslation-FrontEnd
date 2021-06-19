import { getFrenchName } from "../../../Dictionary.js";
export function AfghanMarriageCertificateReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction de la Carte d’enregistrement de naissance",
      isBold: true,
      size: 16
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Ministère de l’Intérieur de la République Islamique d’Afghanistan",
      isBold: true
    },
    {
      type: "text",
      name: "Direction administrative",
      isBold: true
    },
    {
      type: "text",
      name:
        "Direction générale des affaires étrangères et de l’enregistrement des actes d’état civil",
      isBold: true
    },
    {
      type: "text",
      name: "Bureau d’État Civil",
      isBold: true
    },
    {
      type: "text",
      name: "N° de document (BR Code) : " + data.codeBar,
      isBold: true
    },
    {
      type: "text",
      name: "Date d’émission : " + data.issueDate,
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
