import { getFrenchName } from "../../../Dictionary.js";
export function MilitaryServiceLicenceReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction de la Carte de fin de service militaire",
      isBold: true,
      size: 16
    },
    {
      type: "text",
      name: "République Islamique d’Iran",
      isBold: true
    },
    {
      type: "text",
      name: "Photographie du titulaire",
      isBold: false
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "data",
      data: data.nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data.name,
      name: "name"
    },
    {
      type: "data",
      data: data.lastName,
      name: "lastName"
    },
    {
      type: "data",
      data: data.gender,
      name: "gender"
    },
    {
      type: "data",
      data: data.fatherName,
      name: "fatherName"
    },
    {
      type: "data",
      data: data.certificateId,
      name: "certificateId"
    },
    {
      type: "data",
      data: data.birthDate,
      name: "birthDate"
    },
    {
      type: "data",
      data: data.cardSerial,
      name: "cardSerial"
    },
    {
      type: "data",
      data: data.startDateofMilitaryService,
      name: "serviceStartDate"
    },
    {
      type: "data",
      data: data.militaryServiceEndDate,
      name: "militaryServiceEndDate"
    },
    {
      type: "data",
      data: getFrenchName(data.grade),
      name: "grade"
    },
    {
      type: "data",
      data: data.dateofIssue,
      name: "dateofIssue"
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
        "Signature du Chef de l’Organisation de la conscription publique de la Force",
      isBold: true
    },
    {
      type: "text",
      name: "Disciplinaire de la République Islamique d'Iran",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Notification :",
      isBold: true,
      align: "left"
    },
    {
      type: "text",
      name:
        "1- En cas de perte cette carte, nous demandons à son titulaire d’en informer le plus rapidement ",
      isBold: false,
      align: "left"
    },

    {
      type: "text",
      name:
        "possible le bureau le plus proche de l’Organisation de la conscription publique de la Force de ",
      isBold: false,
      align: "left"
    },

    {
      type: "text",
      name: "police de la République Islamique d'Iran.",
      isBold: false,
      align: "left"
    },
    {
      type: "text",
      name:
        "2- La carte retrouvée doit être remise au commissariat de police le plus proche ou dans la ",
      isBold: false,
      align: "left"
    },

    {
      type: "text",
      name:
        "boîte aux lettres de la poste. (Téhéran, Boîte aux lettres : 16415 – 313)",
      isBold: false,
      align: "left"
    }
  ];
}
