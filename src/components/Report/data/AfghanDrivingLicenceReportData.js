import { getFrenchName } from "../../../Dictionary.js";
import { getComplexDate } from "../ExcelUtil";
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
    if (category[i] === true) {
      cat = cat + categoryName[i];
    }
  }
  let categoryData = [];
  if (category[0] === true) {
    categoryData = [
      ...categoryData,
      ...[
        {
          type: "text",
          name:
            "Catégorie A échelle 5 : permet de conduire tout type de motocyclette et de Tuk-tuk.",
          isBold: false,
          align: "left"
        }
      ]
    ];
  }
  if (category[1] === true) {
    categoryData = [
      ...categoryData,
      ...[
        {
          type: "text",
          name:
            "Catégorie B échelle 4 : permet de conduire un véhicule dont le poids total autorisé en charge (PTAC)",
          isBold: false,
          align: "left"
        },
        {
          type: "text",
          name:
            "est de 3,5 tonnes au maximum et comportant moins de neuf places assises, conducteur compris.",
          isBold: false,
          align: "left"
        }
      ]
    ];
  }
  if (category[2] === true) {
    categoryData = [
      ...categoryData,
      ...[
        {
          type: "text",
          name:
            "Catégorie C échelle 3 : autorise la conduite d’un poids lourd dont le poids total autorisé en",
          isBold: false,
          align: "left"
        },
        {
          type: "text",
          name: "charge (PTAC) est supérieur de 3,5.",
          isBold: false,
          align: "left"
        }
      ]
    ];
  }
  if (category[3] === true) {
    categoryData = [
      ...categoryData,
      ...[
        {
          type: "text",
          name:
            "Catégorie D échelle 2 : autorise la conduite d’un véhicule affecté au transport de personnes",
          isBold: false,
          align: "left"
        },
        {
          type: "text",
          name: "comportant plus de neuf places assises, conducteur compris.",
          isBold: false,
          align: "left"
        }
      ]
    ];
  }
  if (category[4] === true) {
    categoryData = [
      ...categoryData,
      ...[
        {
          type: "text",
          name:
            "Catégorie E échelle 1 : autorise la conduite des véhicules affectés au transport de marchandises.",
          isBold: false,
          align: "left"
        },
        {
          type: "text",
          name:
            "Ce permis autorise également la conduite des véhicules des catégories B, C et D.",
          isBold: false,
          align: "left"
        }
      ]
    ];
  }
  cat = cat.slice(0, -4);
  let province;
  let temp = getFrenchName(data.directorProvince);
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
      isBold: true
    },
    {
      type: "text",
      name: "Permis de conduire  –  Catégories : " + cat,
      isBold: true
    },
    {
      type: "text",
      name:
        "Photo d’identité du titulaire, tamponnée du sceau de la Direction générale de la circulation",
      isBold: true
    },
    {
      type: "text",
      name: "de la Province " + province,
      isBold: true
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
      data: data.tazkaraInformation1
        ? data.tazkaraInformation1.pageNumber +
          "-" +
          data.tazkaraInformation1.pageNumber +
          "-" +
          data.tazkaraInformation1.registerNumber
        : "",
      name: "tazkaraInformation1"
    },
    {
      type: "data",
      data: getComplexDate(data.aBirthDate),
      name: "aBirthDate"
    },

    {
      type: "empty"
    },

    {
      type: "text",
      name: "Lieu de naissance",
      isBold: false
    },
    {
      type: "data",
      data: data.provinceDistrict.province,
      name: "province"
    },
    {
      type: "data",
      data: data.provinceDistrict.district,
      name: "district"
    },
    {
      type: "data",
      data: data.provinceDistrict.village,
      name: "village"
    },
    {
      type: "text",
      name: "Adresse",
      isBold: false
    },
    {
      type: "data",
      data: data.provinceDistrict1.province,
      name: "province"
    },
    {
      type: "data",
      data: data.provinceDistrict1.district,
      name: "district"
    },
    {
      type: "data",
      data: data.provinceDistrict1.village,
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
      data: getFrenchName(data.directorProvince),
      name: "directorProvince"
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
      data: data.licensePage,
      name: "licensePage"
    },
    {
      type: "data",
      data: data.licenseRegistration,
      name: "licenseRegistration"
    },

    {
      type: "text",
      name: "Signature et Cachet du Directeur de la Circulation",
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
      name: "Notification :",
      isBold: true
    },
    ...categoryData
  ];
}
