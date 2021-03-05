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
      isBold: true,
      size: 12
    },
    {
      type: "empty"
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
      name: "startDateofMilitaryService"
    },
    {
      type: "data",
      data: data.militaryServiceEndDate,
      name: "militaryServiceEndDate"
    },
    {
      type: "data",
      data: data.grade,
      name: "grade"
    },
    {
      type: "data",
      data: data.dateofIssue,
      name: "dateofIssue"
    }
  ];
}
