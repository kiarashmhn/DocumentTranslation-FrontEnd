import { getFrenchName } from "../../../Dictionary.js";
import { alignmentLeft, getComplexDate, titleSize } from "../ExcelUtil";
export function AfghanDrivingLicenseReportData(data) {
  let ticketData =
    data.ticket === "yes"
      ? [
          {
            type: "text",
            name: "Carte jointe au permis de conduire (carte d’infractions)",
            isBold: true
          },
          {
            type: "empty"
          },
          {
            type: "data",
            data: data.serialNumber2,
            name: "serialNumber2"
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
            type: "text",
            name: "Direction Générale de la Circulation de la",
            align: alignmentLeft
          },
          {
            type: "data",
            data: getFrenchName(data.directorProvince),
            name: "province"
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
            type: "text",
            name: "Manuscrit",
            align: alignmentLeft
          },
          {
            type: "pureData",
            data: data.licensePage,
            name: "    Page"
          },
          {
            type: "pureData",
            data: data.licenseRegistration,
            name: "    N° d'enregistrement"
          },
          {
            type: "empty"
          },
          {
            type: "text",
            name:
              "Sceau et signature de la Direction Générale de la Circulation",
            isBold: true,
            align: alignmentLeft
          },
          {
            type: "text",
            name: "Les infractions reconnues par la loi de circulation.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "1èr groupe :",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "1- Délit de fuite après un accident.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "2- Conduite en état d’ivresse ou sous stupéfiants.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "3- Conduite de véhicules non conformes aux normes",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "de sécurité (défaut de ceinture de sécurité ou de phares)",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "4- Dépassement d’un feu rouge.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "5- Non respect de la vitesse autorisée.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "6- Surcharge de passagers ou de marchandises.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "2ème groupe :",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "1- Non respect de la distance autorisée.",
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "2- Non respect de la signalisation au moment de tourner dans une autre direction.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "3- Non respect de priorité aux carrefours.",
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "4- Non respect des règles de circulation au moment de devancer d’autres véhicules.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "5- Non allumage des phares appropriés pendant la nuit.",
            align: alignmentLeft
          },
          {
            type: "text",
            name: "6- Arrêt et stationnement dans des lieux interdits.",
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "Note : en cas de perte de cette carte, le titulaire devra passer un examen afin d’obtenir une nouvelle carte.",
            align: alignmentLeft
          },
          { type: "empty" },
          {
            type: "text",
            name:
              "Sceau et signature de la Direction de la Sécurité et Circulation.",
            isBold: true,
            align: alignmentLeft
          },
          { type: "empty" },
          {
            type: "text",
            name: "Verso :",
            isBold: true,
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "(Carte des infractions au Code de la Route et indication de leur groupe)",
            align: alignmentLeft
          },
          { type: "empty" },
          {
            type: "text",
            name:
              "Sceau et signature de la Direction de la Sécurité et Circulation.",
            isBold: true,
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "Après deux infractions de 2èr groupe ou quatre infractions de 2ème groupe au cours de la même année,",
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "le permis de conduire et la carte des infractions du conducteur seront confisqués par l’Office de",
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "Circulation pour une durée de 3 mois (selon l’article 79 de la Loi de circulation). Dans ce cas,",
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "le conducteur sera dans l’obligation de passer une formation théorique et à condition de réussir",
            align: alignmentLeft
          },
          {
            type: "text",
            name:
              "l’examen, une nouvelle carte des infractions lui sera délivrée.",
            align: alignmentLeft
          }
        ]
      : [];
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
          align: alignmentLeft
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
          align: alignmentLeft
        },
        {
          type: "text",
          name:
            "est de 3,5 tonnes au maximum et comportant moins de neuf places assises, conducteur compris.",
          isBold: false,
          align: alignmentLeft
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
          align: alignmentLeft
        },
        {
          type: "text",
          name: "charge (PTAC) est supérieur de 3,5.",
          isBold: false,
          align: alignmentLeft
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
          align: alignmentLeft
        },
        {
          type: "text",
          name: "comportant plus de neuf places assises, conducteur compris.",
          isBold: false,
          align: alignmentLeft
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
          align: alignmentLeft
        },
        {
          type: "text",
          name:
            "Ce permis autorise également la conduite des véhicules des catégories B, C et D.",
          isBold: false,
          align: alignmentLeft
        }
      ]
    ];
  }
  cat = cat.slice(0, -4);
  let province;
  let temp = getFrenchName(data.directorProvince);
  // eslint-disable-next-line no-constant-condition
  let first = temp.substring(0, 1);
  if (
    first === "A" ||
    first === "E" ||
    first === "I" ||
    first === "O" ||
    first === "U" ||
    first === "Y" ||
    first === "H"
  ) {
    province = "d’" + temp;
  } else province = "de " + temp;
  return [
    {
      type: "text",
      name: "Traduction du Permis de Conduire",
      isBold: true,
      size: titleSize
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
      name: "tazkaraInformation1",
      data:
        "Volume:" +
        data.tazkaraInformation1.volumeNumber +
        " - " +
        "Page:" +
        data.tazkaraInformation1.pageNumber +
        " - " +
        "N°:" +
        data.tazkaraInformation1.registerNumber
    },
    {
      type: "data",
      data: getComplexDate(data.aBirthDate),
      name: "aBirthDate"
    },
    {
      type: "text",
      name: "Lieu de naissance",
      align: alignmentLeft
    },
    {
      type: "pureData",
      data: data.provinceDistrict.province,
      name: "    Province"
    },
    {
      type: "pureData",
      data: data.provinceDistrict.district,
      name: "    District"
    },
    {
      type: "pureData",
      data: data.provinceDistrict.village,
      name: "    Village"
    },
    {
      type: "text",
      name: "Adresse",
      align: alignmentLeft
    },
    {
      type: "pureData",
      data: data.provinceDistrict1.province,
      name: "    Province"
    },
    {
      type: "pureData",
      data: data.provinceDistrict1.district,
      name: "    District"
    },
    {
      type: "pureData",
      data: data.provinceDistrict1.village,
      name: "    Village"
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
      type: "text",
      name: "Manuscrit",
      align: alignmentLeft
    },
    {
      type: "pureData",
      data: data.licensePage,
      name: "    Page"
    },
    {
      type: "pureData",
      data: data.licenseRegistration,
      name: "    N° d'enregistrement"
    },
    {
      type: "empty"
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
      type: "text",
      name: "Notification :",
      isBold: true,
      align: alignmentLeft
    },
    ...categoryData,
    {
      type: "empty"
    },
    ...ticketData
  ];
}
