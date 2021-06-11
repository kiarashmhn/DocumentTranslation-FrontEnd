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
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Le titulaire est tenu de prévenir immédiatement le Bureau d’État Civil",
      isBold: false,
      size: 12
    },
    {
      type: "text",
      name: "de tout changement de son domicile.",
      isBold: false,
      size: 12
    }
  ];
  if (data.isSmartCard) {
    return [
      ...footer,
      {
        type: "text",
        name: "La carte retrouvée doit être remise dans une boîte aux lettres.",
        isBold: false,
        size: 12
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
      isBold: false,
      size: 12
    }
  ];
};

export function IDCardReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction de la Carte d'Identité Nationale Iranienne",
      isBold: true,
      size: 16
    },
    {
      type: "text",
      name: "République Islamique d’Iran",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Ministère de l’Intérieur",
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
      name: "Photographie du titulaire",
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
