import { getFrenchName } from "../../../Dictionary.js";
import { alignmentLeft, titleSize } from "../ExcelUtil";
export function BirthLicenseReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction de la Carte d’enregistrement de naissance",
      isBold: true,
      size: titleSize
    },
    {
      type: "text",
      name: "Ministère de l’Intérieur de la République Islamique d’Afghanistan",
      isBold: true
    },
    {
      type: "text",
      name: "Direction administrative",
      isBold: true
    },
    {
      type: "text",
      name:
        "Direction générale des affaires étrangères et de l’enregistrement des actes d’état civil",
      isBold: true
    },
    {
      type: "text",
      name: "Bureau d’État Civil",
      isBold: true
    },
    {
      type: "text",
      name: "N° de document (BR Code) : " + data.codeBar,
      isBold: true
    },
    {
      type: "text",
      name: "Date d’émission : " + data.issueDate,
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "Informations sur l’enregistrement de l’acte de naissance (Taskera)",
      isBold: true
    },
    {
      type: "text",
      name: "Lieu de naissance",
      isBold: false,
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
      type: "pureData",
      data: getFrenchName(data.zone),
      name: "    Zone"
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
      isBold: true
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
      type: "text",
      name: "Adresse",
      isBold: false,
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
      data: getFrenchName(data.gender),
      name: "gender"
    },
    {
      type: "data",
      name: "registeredTazkaraInformation",
      data:
        "Volume:" +
        data.registeredTazkaraInformation.volumeNumber +
        " - " +
        "Page:" +
        data.registeredTazkaraInformation.pageNumber +
        " - " +
        "N°:" +
        data.registeredTazkaraInformation.registerNumber
    },
    {
      type: "data",
      name: "fatherstazkaraInformation",
      data:
        "Volume:" +
        data.fatherstazkaraInformation.volumeNumber +
        " - " +
        "Page:" +
        data.fatherstazkaraInformation.pageNumber +
        " - " +
        "N°:" +
        data.fatherstazkaraInformation.registerNumber
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
      type: "text",
      name:
        "Signature du fonctionnaire en charge de l’enregistrement des Actes d’État Civil au",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "bureau d’État Civil",
      isBold: true,
      size: 12
    },
    {
      type: "text",
      name: "Signature et cachet du responsable du bureau d’État Civil",
      isBold: true,
      size: 12
    }
    /*{
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
    }*/
  ];
}
