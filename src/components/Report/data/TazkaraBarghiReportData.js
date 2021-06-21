import { getFrenchName } from "../../../Dictionary.js";
import { titleSize } from "../ExcelUtil";
export function TazkaraBarghiReportData(data) {
  let sign;

  switch (data.signatureorFingerPrint1) {
    case "fingerPrint":
      sign = "Empreinte digitale du titulaire";
      break;
    case "signature":
      sign = "signature du titulaire";
      break;

    case "both1":
      sign = "Empreinte digitale et signature";
      break;
    default:
      sign = "";
      break;
  }
  return [
    {
      type: "text",
      name: "Traduction de la Carte d'Identité Nationale afghane (Taskera)",
      isBold: true,
      size: titleSize
    },
    {
      type: "text",
      name: "République Islamique d’Afghanistan",
      isBold: true
    },
    {
      type: "text",
      name: "Ministère de l’Intérieur",
      isBold: true
    },
    {
      type: "text",
      name: "Bureau d’État Civil",
      isBold: true
    },
    {
      type: "text",
      name: "Carte d'Identité Nationale (Taskera)",
      isBold: true
    },
    {
      type: "text",
      name: "Photographie du Titulaire",
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
      data: getFrenchName(data.gender),
      name: "gender"
    },
    {
      type: "data",
      data: data.aFatherName,
      name: "aFatherName"
    },
    {
      type: "data",
      data: data.fatherLastName,
      name: "fatherLastName"
    },
    {
      type: "data",
      data: data.grandFatherName,
      name: "grandFatherName"
    },

    {
      type: "data",
      data: data.aBirthDate,
      name: "aBirthDate"
    },
    {
      type: "data",
      data: getFrenchName(data.aBirthLocation),
      name: "aBirthLocation"
    },
    {
      type: "data",
      data: getFrenchName(data.livingLocationTemp),
      name: "livingLocationTemp"
    },
    {
      type: "data",
      data: getFrenchName(data.livingLocationOriginal),
      name: "livingLocationOriginal"
    },
    {
      type: "data",
      data: getFrenchName(data.religion),
      name: "religion"
    },
    {
      type: "data",
      data: getFrenchName(data.tribe),
      name: "tribe"
    },
    {
      type: "data",
      data: getFrenchName(data.nationality),
      name: "nationality"
    },
    {
      type: "data",
      data: data.idNumberr,
      name: "idNumberr"
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
      type: "text",
      name:
        "Signature ou empreinte digitale du titulaire du passeport :" + sign,
      isBold: true,
      size: 10
    }
  ];
}
