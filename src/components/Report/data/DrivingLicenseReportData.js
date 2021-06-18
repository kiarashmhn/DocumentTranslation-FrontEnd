import { getFrenchName } from "../../../Dictionary.js";
export function DrivingLicenseReportData(data) {
  let category = "Catégorie : ";
  let categories = [];
  let categoryKeys = [
    "firstGrade",
    "secondGrade",
    "thirdGrade",
    "special",
    "motorcycle"
  ];
  let categoryNames = ["1", "2", "3", "Catégorie spécifique", "Motocyclette"];
  let categoryDes = [];
  let categoriesData = [
    [
      "Catégorie 1 : autorise la conduite des véhicules affectés au transport de marchandises dont ",
      "PTAC est supérieur à 6 tonnes et ceux affectés au transport de personnes comportant plus de ",
      "26 personnes."
    ],
    [
      "Catégorie 2 : autorise la conduite d’un poids lourd ne dépasse pas 6 tonnes, d’un véhicule ",
      " affecté au transport de personnes comportant 26 personnes au maximum et d’un véhicule de ",
      " transport en commun."
    ],
    [
      "Catégorie 3 : permet de conduire une voiture ou une camionnette comportant moins de neuf",
      "places assises et dont le poids total autorisé en charge (PTAC) est de 3,5 tonnes au maximum."
    ],
    ["Catégorie spécifique"],
    [
      "Motocyclette : permet de conduire d’une motocyclette dont la cylindré est de 200cc",
      "maximum et après 3 ans de détention de cette catégorie et sous condition d’être âgé d’au",
      "moins 23 ans, d’une motocyclette dont la cylindré est supérieure à 200cc."
    ]
  ];
  categoryKeys.map((k, idx) => {
    if (data[k] && data[k].check) {
      categories.push(idx);
    }
  });
  categories.map((k, idx) => {
    if (idx === 0) category += categoryNames[k];
    else category += " et " + categoryNames[k];
    categoriesData[k].map(c => {
      categoryDes.push({ type: "text", name: c, isBold: true, size: 10 });
    });
  });
  let cData = [];
  categories.map(c => {
    cData = [
      ...cData,
      ...[
        {
          type: "data",
          data: getFrenchName(categoryKeys[c]),
          name: "drivingLicenceCategory"
        },
        {
          type: "data",
          data: data[categoryKeys[c]].date,
          name: "firstIssueDate"
        }
      ]
    ];
  });

  return [
    {
      type: "text",
      name: "Traduction du Permis de Conduire",
      isBold: true,
      size: 16
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Police de la République Islamique d’Iran",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Direction Générale de la Circulation",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Photographie du titulaire",
      isBold: false,
      size: 12
    },
    {
      type: "text",
      name: category,
      isBold: false,
      size: 12
    },
    {
      type: "text",
      name: "Valable " + getFrenchName(data.expirationDuration),
      isBold: false,
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
      data: getFrenchName(data.bloodType),
      name: "bloodType"
    },
    {
      type: "data",
      data: data.DrivingLicenceNumber,
      name: "DrivingLicenceNumber"
    },
    {
      type: "data",
      data: data.dateofIssue,
      name: "dateofIssue"
    },
    ...cData,
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
        "Signature du responsable de la Direction générale de la circulation",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Notification :",
      isBold: true,
      size: 12
    },
    ...categoryDes
  ];
}
