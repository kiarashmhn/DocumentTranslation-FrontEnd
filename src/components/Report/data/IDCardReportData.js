import {titleSize} from "../ExcelUtil";

const getSmartCardFields = data => {
  let footer = [
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Notification",
      isBold: true
    },
    {
      type: "text",
      name:
        "Le titulaire est tenu de prévenir immédiatement le Bureau d’État Civil",
      isBold: false
    },
    {
      type: "text",
      name: "de tout changement de son domicile.",
      isBold: false
    }
  ];
  if (data.isSmartCard) {
    return [
      ...footer,
      {
        type: "text",
        name: "La carte retrouvée doit être remise dans une boîte aux lettres.",
        isBold: false
      }
    ];
  }
  return [
    {
      type: "data",
      data: data.certificateId,
      name: "certificateId"
    },
    {
      type: "data",
      data: data.postalCode,
      name: "postalCode"
    },
    ...footer,
    {
      type: "text",
      name: "(" + data.codeBar + ")",
      isBold: false
    }
  ];
};

export function IDCardReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction de la Carte d'Identité Nationale Iranienne",
      isBold: true,
      size: titleSize
    },
    {
      type: "text",
      name: "République Islamique d’Iran",
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
      name: "Photographie du titulaire",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "empty"
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
      data: data.birthDate,
      name: "birthDate"
    },
    {
      type: "data",
      data: data.nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data.cardSerial,
      name: "cardSerial"
    },
    {
      type: "data",
      data: data.validationDate,
      name: "validationDate"
    },
    ...getSmartCardFields(data)
  ];
}
