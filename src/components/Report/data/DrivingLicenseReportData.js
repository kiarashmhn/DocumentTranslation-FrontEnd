import { getFrenchName } from "../../../Dictionary.js";
export function DrivingLicenseReportData(data) {
  let type1;
  let type2;
  //let type3;
  let category = getFrenchName(data.drivingLicenceCategory);
  switch (data.drivingLicenceCategory) {
    case "motorcycle":
      type1 =
        "Motocyclette : permet de conduire d’une motocyclette dont la cylindré est de 200cc";
      type2 =
        "maximum et après 3 ans de détention de cette catégorie et sous condition d’être âgé d’au";
      /*type3 =
        "moins 23 ans, d’une motocyclette dont la cylindré est supérieure à 200cc.";*/
      break;
    case "thirdGrade":
      type1 =
        "Catégorie 3 : permet de conduire une voiture ou une camionnette comportant moins de neuf";
      type2 =
        "places assises et dont le poids total autorisé en charge (PTAC) est de 3,5 tonnes au maximum.";
      break;

    case "secondGrade":
      type1 =
        "Catégorie 2 : autorise la conduite d’un poids lourd ne dépasse pas 6 tonnes, d’un véhicule \n affecté au transport de personnes comportant 26 personnes au maximum et d’un véhicule de<br> transport en commun.";
      break;
    case "firstGrade":
      type1 =
        "Catégorie 1 : autorise la conduite des véhicules affectés au transport de marchandises dont \n PTAC est supérieur à 6 tonnes et ceux affectés au transport de personnes comportant plus de \n 26 personnes.";
      break;
    case "special":
      type1 = "special";
      break;
  }
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
      data: getFrenchName(data.drivingLicenceCategory),
      name: "drivingLicenceCategory"
    },
    {
      type: "data",
      data: data.firstIssueDate,
      name: "firstIssueDate"
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
    {
      type: "text",
      name: type1,
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name: type2,
      isBold: true,
      size: 10
    }
  ];
}
