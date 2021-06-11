import { getFrenchName } from "../../../Dictionary.js";
export function AfghanDrivingLicenseReportData(data) {
  let category = [
    data.aGrade,
    data.bGrade,
    data.cGrade,
    data.dGrade,
    data.eGrade
  ];
  let categoryName = [
    "Catégorie A et ",
    "Catégorie B et ",
    "Catégorie C et ",
    "Catégorie D et ",
    "Catégorie E et "
  ];
  let cat = " ";

  for (let i = 0; i < category.length; i++) {
    if (category[i].toString() === "1") {
      cat = cat + categoryName[i];
    }
  }
  let a;
  let c;
  let d;
  let e;
  let f;
  let g;
  let h;
  let k;
  let j;
  if (category[0] === 1) {
    a =
      "Catégorie A échelle 5 : permet de conduire tout type de motocyclette et de Tuk-tuk.";
  }
  if (category[1] === 1) {
    c =
      "Catégorie B échelle 4 : permet de conduire un véhicule dont le poids total autorisé en charge (PTAC)";
    d =
      "est de 3,5 tonnes au maximum et comportant moins de neuf places assises, conducteur compris.";
  }
  if (category[2] === 1) {
    e =
      "Catégorie C échelle 3 : autorise la conduite d’un poids lourd dont le poids total autorisé en";
    f = "charge (PTAC) est supérieur de 3,5.";
  }
  if (category[3] === 1) {
    g =
      "Catégorie D échelle 2 : autorise la conduite d’un véhicule affecté au transport de personnes";
    h = "comportant plus de neuf places assises, conducteur compris.";
  }
  if (category[4] === 1) {
    k =
      "Catégorie E échelle 1 : autorise la conduite des véhicules affectés au transport de marchandises.";
    j =
      "Ce permis autorise également la conduite des véhicules des catégories B, C et D.";
  }
  cat = cat.slice(0, -4);
  let province = "";
  let temp = getFrenchName(data.directorProvince1);
  // eslint-disable-next-line no-constant-condition
  if (temp.substring(0, 1) === "A" || "E" || "I" || "O" || "U" || "Y") {
    province = "d’" + temp;
  } else province = "de " + temp;
  return [
    {
      type: "text",
      name: "Traduction du Permis de Conduire",
      isBold: true,
      size: 16
    },

    {
      type: "text",
      name:
        "Ministère de l'intérieur de l'Afghanistan - Direction générale de la circulation",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Permis de conduire  –  Catégories : " + cat,
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Photo d’identité du titulaire, tamponnée du sceau de la Direction générale de la circulation",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "de la Province " + province,
      isBold: true,
      size: 12
    },
    {
      type: "empty"
    },

    {
      type: "data",
      data: data.aName1,
      name: "aName1"
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
      data: data.tazkaraInformation ? data.tazkaraInformation.pageNumber : "",
      name: "tazkaraInformation1"
    },
    {
      type: "data",
      data: data.aBirthDate,
      name: "aBirthDate"
    },

    {
      type: "empty"
    },

    {
      type: "text",
      name: "Lieu de naissance",
      isBold: false,
      size: 12
    },
    {
      type: "data",
      data: data.province,
      name: "province"
    },
    {
      type: "data",
      data: data.district,
      name: "district"
    },
    {
      type: "data",
      data: data.village,
      name: "village"
    },
    {
      type: "text",
      name: "Adresse",
      isBold: false,
      size: 12
    },
    {
      type: "data",
      data: data.province,
      name: "province"
    },
    {
      type: "data",
      data: data.district,
      name: "district"
    },
    {
      type: "data",
      data: data.village,
      name: "village"
    },
    {
      type: "empty"
    },
    {
      type: "data",
      data: getFrenchName(data.bloodType),
      name: "bloodType"
    },
    {
      type: "data",
      data: data.serialNumber2,
      name: "serialNumber2"
    },
    {
      type: "data",
      data: getFrenchName(data.directorProvince1),
      name: "directorProvince1"
    },
    {
      type: "data",
      data: data.dateofIssue1,
      name: "dateofIssue1"
    },
    {
      type: "data",
      data: data.validationDate1,
      name: "validationDate1"
    },
    {
      type: "data",
      data: data.category2,
      name: "category2"
    },
    {
      type: "data",
      data: data.Manuscript,
      name: "Manuscript"
    },

    {
      type: "text",
      name: "Signature et Cachet du Directeur de la Circulation",
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
      name: "Notification :",
      isBold: true,
      size: 12
    },

    {
      type: "text",
      name: a,
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: c,
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: d,
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: e,
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: f,
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: g,
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: h,
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: k,
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: j,
      isBold: false,
      align: "left",
      size: 12
    }
  ];
}
