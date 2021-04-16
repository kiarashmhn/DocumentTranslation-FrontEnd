import { getFrenchName } from "Dictionary.js";
export function BirthLicenseReportData(data) {
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
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Direction administrative",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Direction générale des affaires étrangères et de l’enregistrement des actes d’état civil",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Bureau d’État Civil",
      isBold: true,
      size: 12
    },

    {
      type: "text",
      name: "N° de document (BR Code) : " + data.codeBar,
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Date d’émission : " + data.issueDate,
      isBold: true,
      size: 12
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
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Carte d’enregistrement de naissance (Description de la personne concernée) ",
      isBold: true,
      size: 12
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
      name:
        "Signature ou empreinte digitale du titulaire du passeport :" +
        data.sign,
      isBold: true,
      size: 10
    }
  ];
}
