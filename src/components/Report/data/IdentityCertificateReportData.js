import { compareDates } from "../ExcelUtil";

const getSpouse = spouse => {
  let info = {
    name: spouse.name,
    lastName: spouse.lastName,
    certificateId: spouse.certificateId,
    birthLocation: spouse.birthLocation,
    birthDate: spouse.birthDate,
    marriageDate: spouse.marriageDate,
    marriageLocation: spouse.marriageLocation,
    officeNumber: spouse.officeNumber,
    registrationNumber: spouse.registrationNumber
  };

  if (!spouse.death && !spouse.divorce)
    info = {
      ...info,
      ...{
        divorceOrDeathdivorceOrDeathdivorceOrDeath: "Néant"
      }
    };
  if (spouse.divorce)
    info = {
      ...info,
      ...{
        divorceDate: spouse.divorceDate,
        divorceLocation: spouse.divorceLocation,
        divorceRegistrationNumber: spouse.divorceRegistrationNumber
      }
    };
  if (spouse.death)
    info = {
      ...info,
      ...{
        deathDate: spouse.deathDate
      }
    };
  return info;
};
const getSpouses = data => {
  let spouses = data.spouses.map(spouse => {
    return getSpouse(spouse);
  });
  spouses.sort(function(a, b) {
    return -1 * compareDates(a.marriageDate, b.marriageDate);
  });
  return [
    {
      type: "sortedArray",
      name: "spouses",
      data: spouses
    }
  ];
};

const getSpousesSection = data => {
  if (data.spouses && data.spouses.length >= 1) {
    return getSpouses(data);
  }
  return [
    {
      type: "array",
      name: "spouses",
      data: data.spouses
    }
  ];
};

export function IdentityCertificateReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction de l’Acte d’Etat Civil (Shenasnameh)",
      isBold: true,
      size: 16
    },
    {
      type: "text",
      name:
        "[Acte de naissance, Livret de famille, Certificat de mariage, Certificat de divorce]",
      isBold: false,
      size: 12
    },
    {
      type: "text",
      name: "Armoiries de l’Iran",
      isBold: false
    },
    {
      type: "text",
      name: "République Islamique d’Iran",
      isBold: false
    },
    {
      type: "text",
      name: "Ministère de l’Intérieur",
      isBold: false
    },
    {
      type: "text",
      name: "Organisation des services d’état civil",
      isBold: false
    },
    {
      type: "data",
      name: "serial",
      data: data.serial,
      align: "right"
    },
    {
      type: "text",
      name: "Photographie cachetée du titulaire",
      isBold: false
    },
    {
      type: "empty"
    },
    {
      type: "data",
      data: data.nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data.lastName,
      name: "lastName"
    },
    {
      type: "data",
      data: data.name,
      name: "name"
    },
    {
      type: "data",
      data: data.certificateId,
      name: "certificateId"
    },
    {
      type: "data",
      data: data.birthLocation,
      name: "birthLocation"
    },
    {
      type: "data",
      data: data.birthDate,
      name: "birthDate"
    },
    {
      type: "data",
      data: data.registrationLocation,
      name: "registrationLocation"
    },
    {
      type: "data",
      data: data.registrationDate,
      name: "registrationDate"
    },
    {
      type: "empty"
    },
    {
      type: "data",
      data: data.fatherName,
      name: "fatherName"
    },
    {
      type: "data",
      data: data.fatherId,
      name: "fatherId"
    },
    {
      type: "data",
      data: data.fatherRegistrationLocation,
      name: "fatherRegistrationLocation"
    },
    {
      type: "data",
      data: data.motherName,
      name: "motherName"
    },
    {
      type: "data",
      data: data.motherId,
      name: "motherId"
    },
    {
      type: "data",
      data: data.motherRegistrationLocation,
      name: "motherRegistrationLocation"
    },
    {
      type: "text",
      name: "Signature et cachet du proposé à l’état civil",
      isBold: false
    },
    {
      type: "empty"
    },
    ...getSpousesSection(data),
    {
      type: "empty"
    },
    {
      type: "array",
      data: data.children,
      name: "children"
    },
    {
      type: "empty"
    },
    {
      type: "array",
      data: data.death,
      name: "death"
    },
    {
      type: "empty"
    },
    {
      type: "array",
      data: data.observations,
      name: "observations"
    },
    {
      type: "empty"
    }
  ];
}
