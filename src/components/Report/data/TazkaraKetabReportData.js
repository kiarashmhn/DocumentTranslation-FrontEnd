import { getFrenchName } from "../../../Dictionary.js";
export function TazkaraKetabReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction de l’Acte de Naissance Afghan du Dari au Français",
      isBold: true,
      size: 16
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "République Islamique d’Afghanistan",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Ministère de l’Intérieur - Bureau d’État Civil",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Direction du recensement",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Numéro de document : " + data.docNumber,
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Numéro de volume : " +
        (data.tazkaraInformation ? data.tazkaraInformation.volumeNumber : ""),
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Numéro de page :  " +
        (data.tazkaraInformation ? data.tazkaraInformation.pageNumber : ""),
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Numéro d'enregistrement : " +
        (data.tazkaraInformation ? data.tazkaraInformation.registerNumber : ""),
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Photographie cachetée du titulaire",
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
      name: "Identité",
      isBold: true,
      size: 12
    },
    {
      type: "empty"
    },
    {
      type: "data",
      data: data.aName,
      name: "aName"
    },
    {
      type: "data",
      data: data.aLastName,
      name: "aLastName"
    },

    {
      type: "data",
      data: data.aFatherName,
      name: "aFatherName"
    },

    {
      type: "data",
      data: data.grandFatherName,
      name: "grandFatherName"
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
      data: data.aBirthDate,
      name: "aBirthDate"
    },
    {
      type: "data",
      data: getFrenchName(data.religion),
      name: "religion"
    },
    {
      type: "data",
      data: getFrenchName(data.job),
      name: "job"
    },
    {
      type: "data",
      data: getFrenchName(data.sex),
      name: "gender"
    },
    {
      type: "data",
      data: getFrenchName(data.civilState),
      name: "civilState"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Caractéristiques physiques",
      isBold: true,
      size: 12
    },
    {
      type: "empty"
    },
    {
      type: "data",
      data: getFrenchName(data.height),
      name: "height"
    },
    {
      type: "data",
      data: getFrenchName(data.eyeColor),
      name: "eyeColor"
    },
    {
      type: "data",
      data: getFrenchName(data.eyebrow),
      name: "eyebrow"
    },

    {
      type: "data",
      data: getFrenchName(data.skinColor),
      name: "skinColor"
    },
    {
      type: "data",
      data: getFrenchName(data.hairColor),
      name: "hairColor"
    },
    {
      type: "data",
      data: getFrenchName(data.otherSigns),
      name: "otherSigns"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Enregistré auprès du bureau du registre d'état civil",
      isBold: true,
      size: 12
    },
    {
      type: "empty"
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
      data: data.registeredTazkaraInformation,
      name: "registeredTazkaraInformation"
    },
    {
      type: "data",
      data: data.fatherstazkaraInformation,
      name: "fatherstazkaraInformation"
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
        data.aName +
        " " +
        data.aLastName +
        ", dont son identité  et son état civil sont mentionnés dans cet acte de naissance",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "(Taskera), est de nationalité afghane selon le bureau d'état civil du gouvernement de la",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "République d’Afghanistan. Son acte de naissance (Taskera) a été délivré au bureau d’État",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name: "Civil du district",
      isBold: true,
      size: 10
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
      name:
        "1.	Tous les citoyens du gouvernement de la République d’Afghanistan ont l’obligation",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name: "d’obtenir un acte de naissance (Taskera).",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "2.	La personne qui utilise un faux acte de naissance (Taskera) sera punie selon la loi.",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "3.	En cas de perte de  votre acte de naissance (Taskera), vous devez en demander le ",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "renouvellement auprès du bureau d'état civil qui a délivré votre premier acte de naissance",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name: "(Taskera).",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "4.	Si vous trouvez cet acte de naissance (Taskera), nous vous demandons de le rapporter",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "au bureau d'état civil qui a délivré cet acte de naissance (Taskera), ou au bureau  d'état civil le",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name: "plus proche.",
      isBold: true,
      size: 10
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Signature de l’officier du bureau d’État Civil",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Signature du responsable du bureau d’État Civil",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Cachet du bureau d’État Civil",
      isBold: true,
      size: 12
    }
  ];
}