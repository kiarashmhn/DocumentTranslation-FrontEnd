import { getFrenchName } from "../../../Dictionary.js";
export function BirthLicenseReportData(data) {
  let sign = "";

  switch (data.signatureorFingerPrint) {
    case "fingerPrint":
      sign = "Empreinte digitale du titulaire";
      break;
    case "signature":
      sign = "signature du titulaire";
      break;
    case "both":
      sign = "Empreinte digitale et signature du titulaire";
      break;
    case "nothing":
      sign = "";
      break;
  }
  return [
    {
      type: "text",
      name: "Traduction de la Carte d’enregistrement de naissance",
      isBold: true,
      size: 16
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Ministère de l’Intérieur de la République Islamique d’Afghanistan",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Direction administrative",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name:
        "Direction générale des affaires étrangères et de l’enregistrement des actes d’état civil",
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
      name: "N° de document (BR Code) : " + data.aCodeBar,
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Date d’émission : " + data.issueDate,
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
      name:
        "Informations sur l’enregistrement de l’acte de naissance (Taskera)",
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
      data: getFrenchName(data.zone),
      name: "zone"
    },
    {
      type: "data",
      data: data.houseNumber,
      name: "houseNumber"
    },
    {
      type: "data",
      data: data.volumeNo,
      name: "volumeNo"
    },
    {
      type: "data",
      data: data.pageNo,
      name: "pageNo"
    },
    {
      type: "data",
      data: data.registerNo,
      name: "registerNo"
    },
    {
      type: "data",
      data: data.tazkaraDate,
      name: "tazkaraDate"
    },
    {
      type: "data",
      data: data.tazkaraNumber,
      name: "tazkaraNumber"
    },
    {
      type: "data",
      data: data.tazkaraNumberElectronic,
      name: "tazkaraNumberElectronic"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "Carte d’enregistrement de naissance (Description de la personne concernée) ",
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
      data: data.valadiat,
      name: "valadiat"
    },
    {
      type: "data",
      data: data.motherName,
      name: "motherName"
    },
    {
      type: "data",
      data: data.birthDate,
      name: "birthDate"
    },
    {
      type: "data",
      data: data.province,
      name: "province"
    },
    {
      type: "data",
      data: getFrenchName(data.gender),
      name: "gender"
    },
    {
      type: "data",
      data: data.idNumber,
      name: "idNumber"
    },
    {
      type: "data",
      data: data.issueDate,
      name: "issueDate"
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
      name: "Empreinte digitale et signature du titulaire : " + sign,
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "Signature du fonctionnaire en charge de l’enregistrement des Actes d’État Civil au",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name: "bureau d’État Civil",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name: "Signature et cachet du responsable du bureau d’État Civil",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "Le document est tamponné et validé par le ministère des affaires étrangères ? " +
        getFrenchName(data.signed),
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "Cachet et signature du directeur de la Direction consulaire du Ministère des affaires",
      isBold: true,
      size: 10
    },
    {
      type: "text",
      name:
        "étrangères, Numéro d’identification " +
        data.identificationNumber +
        " Date : le " +
        data.ministryDate,
      isBold: true,
      size: 10
    }
  ];
}
