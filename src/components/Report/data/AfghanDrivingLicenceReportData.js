export function AfghanDrivingLicenseReportData(data) {
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
      type: "empty"
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
      name: "Permis de conduire  –  Catégories : ",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Photo d’identité du titulaire, tamponnée du sceau de la Direction générale de la circulation de la",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Province de ",
      isBold: true,
      size: 12
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
      data: data.fatherName,
      name: "fatherName"
    },
    {
      type: "data",
      data: data.tazkaraInformation,
      name: "tazkaraInformation"
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
      type: "data",
      data: data.bloodType,
      name: "bloodType"
    },
    {
      type: "data",
      data: data.serialNumber,
      name: "serialNumber"
    },
    {
      type: "data",
      data: data.directorProvince,
      name: "directorProvince"
    },
    {
      type: "data",
      data: data.dateofIssue,
      name: "dateofIssue"
    },
    {
      type: "data",
      data: data.validationDate,
      name: "validationDate"
    },
    {
      type: "data",
      data: data.category,
      name: "category"
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
      type: "text",
      name: "Notification :",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Au vu du registre 23 / 93 / 182, ce permis de conduire a été renouvelé pour la catégorie B échelle 4.",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name:
        "Catégorie A échelle 5 : permet de conduire tout type de motocyclette et de Tuk-tuk.",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name:
        "Catégorie B échelle 4 : permet de conduire un véhicule dont le poids total autorisé en charge (PTAC) est",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name:
        "de 3,5 tonnes au maximum et comportant moins de neuf places assises, conducteur compris.",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name:
        "Catégorie C échelle 3 : autorise la conduite d’un poids lourd dont le poids total autorisé en charge",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: "(PTAC) est supérieur de 3,5.",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name:
        "Catégorie D échelle 2 : autorise la conduite d’un véhicule affecté au transport de personnes comportant ",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name: "plus de neuf places assises, conducteur compris.",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name:
        "Catégorie E échelle 1 : autorise la conduite des véhicules affectés au transport de marchandises. Ce",
      isBold: false,
      align: "left",
      size: 12
    },
    {
      type: "text",
      name:
        "permis autorise également la conduite des véhicules des catégories B, C et D. ",
      isBold: false,
      align: "left",
      size: 12
    }
  ];
}
