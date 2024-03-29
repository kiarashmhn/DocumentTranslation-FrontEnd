import { getFrenchName } from "../../../Dictionary.js";
import { alignmentLeft, getComplexDate, titleSize } from "../ExcelUtil";
export function TazkaraReportData(data) {
  let sign = "";

  switch (data.signatureorFingerPrint1) {
    case "fingerPrint":
      sign = "Empreinte digitale du titulaire";
      break;
    case "signature":
      sign = "signature du titulaire";
      break;

    case "both1":
      sign = "Empreinte digitale et signature du titulaire";
      break;
    default:
      sign = "";
      break;
  }
  return [
    {
      type: "text",
      name: "Traduction de l’Acte de Naissance Afghan du Dari au Français",
      isBold: true,
      size: titleSize
    },
    {
      type: "text",
      name: "République Islamique d’Afghanistan",
      isBold: true
    },
    {
      type: "text",
      name: "Ministère de l’Intérieur - Bureau d’État Civil",
      isBold: true
    },
    {
      type: "text",
      name: "Direction du recensement",
      isBold: true
    },
    {
      type: "text",
      name: "Numéro de document : " + data.docNumber,
      isBold: true
    },
    {
      type: "text",
      name: "Tarif de l’acte de naissance : 10 Afghani",
      isBold: true
    },
    {
      type: "text",
      name:
        "Photo d’identité du titulaire, tamponnée du sceau de la Direction d’État Civil",
      isBold: true
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
      type: "text",
      name: "Lieu de naissance",
      align: alignmentLeft
    },
    {
      type: "pureData",
      data: data.provinceDistrict?.province,
      name: "    Province"
    },
    {
      type: "pureData",
      data: data.provinceDistrict?.district,
      name: "    District"
    },
    {
      type: "pureData",
      data: data.provinceDistrict?.village,
      name: "    Village"
    },
    {
      type: "data",
      data: getComplexDate(data.aBirthDate),
      name: "aBirthDate"
    },
    {
      type: "data",
      data: getFrenchName(data.religion),
      name: "religion"
    },
    {
      type: "data",
      data: getFrenchName(data.nationality1),
      name: "nationality"
    },
    {
      type: "data",
      data: getFrenchName(data.job),
      name: "job"
    },
    {
      type: "data",
      data: getFrenchName(data.sext),
      name: "gender"
    },
    {
      type: "data",
      data: getFrenchName(data.civilState),
      name: "civilState"
    },
    {
      type: "data",
      data: data.familyMembers,
      name: "familyMembers"
    },
    {
      type: "data",
      data: getFrenchName(data.motherLanguage),
      name: "motherLanguage"
    },
    {
      type: "data",
      data: data.foreignLanguage,
      name: "foreignLanguage"
    },
    {
      type: "data",
      data: getFrenchName(data.militaryStatus),
      name: "militaryStatus"
    },
    {
      type: "data",
      data: getFrenchName(data.tribe),
      name: "tribe"
    },
    {
      type: "text",
      name: "Caractéristiques physiques",
      isBold: true
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
      data: getFrenchName(data.hairColor),
      name: "hairColor"
    },
    {
      type: "data",
      data: getFrenchName(data.skinColor),
      name: "skinColor"
    },
    {
      type: "data",
      data: getFrenchName(data.otherSigns),
      name: "otherSigns"
    },
    {
      type: "text",
      name: "Enregistré auprès du bureau du registre d'état civil",
      isBold: true
    },
    {
      type: "data",
      data: data.provinceDistrict1?.province,
      name: "province"
    },
    {
      type: "data",
      data: data.provinceDistrict1?.district,
      name: "district"
    },
    {
      type: "data",
      data: data.provinceDistrict1?.village,
      name: "village"
    },
    {
      type: "data",
      name: "registeredTazkaraInformation",
      data:
        "Volume:" +
        data.registeredTazkaraInformation?.volumeNumber +
        " - " +
        "Page:" +
        data.registeredTazkaraInformation?.pageNumber +
        " - " +
        "N°:" +
        data.registeredTazkaraInformation?.registerNumber
    },
    {
      type: "data",
      name: "fatherstazkaraInformation",
      data:
        "Volume:" +
        data.fatherstazkaraInformation?.volumeNumber +
        " - " +
        "Page:" +
        data.fatherstazkaraInformation?.pageNumber +
        " - " +
        "N°:" +
        data.fatherstazkaraInformation?.registerNumber
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Empreinte digitale de la personne concernée : " + sign,
      isBold: true,
      size: 12
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
      name: "Signature du responsable du bureau d’État Civil",
      isBold: true,
      size: 12
    }
  ];
}
