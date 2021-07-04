import {
  alignmentLeft,
  capitalize,
  getComplexDate,
  getCorrectName,
  titleSize
} from "../ExcelUtil";
export function AfghanMarriageCertificateReportData(data) {
  let officeName = "";
  const getFields = (d, a) => {
    let r = [];
    r.push({
      type: "data",
      data: d["name" + a],
      name: "name"
    });
    if (d["valad" + a] && d["valadiat" + a]) {
      r.push(
        {
          type: "data",
          data: d["valad" + a],
          name: "valad"
        },
        {
          type: "data",
          data: d["valadiat" + a],
          name: "valadiat"
        }
      );
    }
    r.push(
      {
        type: "data",
        data: getComplexDate(d["aBirthDate" + a]),
        name: "aBirthDate"
      },
      {
        type: "data",
        data: d["nationality" + a],
        name: "nationality"
      },
      {
        type: "pureData",
        data:
          "Volume:" +
          d["registeredTazkaraInformation" + a].volumeNumber +
          " - " +
          "Page:" +
          d["registeredTazkaraInformation" + a].pageNumber +
          " - " +
          "N°:" +
          d["registeredTazkaraInformation" + a].registerNumber,
        name: "N° de Taskera (Acte de naissance)"
      }
    );
    if (d["livingLocationTemp" + a]) {
      r.push(
        {
          type: "text",
          name: "Lieu de résidence principale",
          isBold: false,
          align: alignmentLeft
        },
        {
          type: "pureData",
          data: capitalize(d["livingLocationTemp" + a].country),
          name: "    Pays"
        }
      );
      if (d["livingLocationTemp" + a].country === "afghanistan")
        r.push(
          {
            type: "pureData",
            data: d["livingLocationTemp" + a].province,
            name: "    Province"
          },
          {
            type: "pureData",
            data: d["livingLocationTemp" + a].district,
            name: "    District"
          },
          {
            type: "pureData",
            data: d["livingLocationTemp" + a].village,
            name: "    Village"
          }
        );
    }
    if (d["livingLocationOriginal" + a]) {
      r.push(
        {
          type: "text",
          name: "Lieu de résidence actuelle",
          isBold: false,
          align: alignmentLeft
        },
        {
          type: "pureData",
          data: capitalize(d["livingLocationOriginal" + a].country),
          name: "    Pays"
        }
      );
      if (d["livingLocationOriginal" + a].country === "afghanistan")
        r.push(
          {
            type: "pureData",
            data: d["livingLocationOriginal" + a].province,
            name: "    Province"
          },
          {
            type: "pureData",
            data: d["livingLocationOriginal" + a].district,
            name: "    District"
          },
          {
            type: "pureData",
            data: d["livingLocationOriginal" + a].village,
            name: "    Village"
          }
        );
    }
    return r;
  };

  const getChildrenInfo = () => {
    let children = [];
    data.afghanChildren.forEach((c, idx) => {
      children.push(
        {
          type: "text",
          name: "Enfant " + (idx + 1) + ":",
          isBold: true
        },
        ...getFields(c, ""),
        {
          type: "empty"
        }
      );
    });
    if (data.afghanChildren && data.afghanChildren.length > 0) {
      return [
        {
          type: "empty"
        },
        {
          type: "text",
          name:
            "A cette date, de leur union sont nés " +
            data.afghanChildren.length +
            " enfant" +
            (data.afghanChildren.length > 1 ? "s" : "") +
            " :",
          isBold: false
        },
        ...children
      ];
    }
    return [
      {
        type: "empty"
      }
    ];
  };

  const getExtra = () => {
    if (data.ministryConfirm === "yes") {
      return [
        {
          type: "text",
          name:
            "La Direction consulaire du Ministère des affaires étrangères atteste l’exactitude du ",
          isBold: false
        },
        {
          type: "text",
          name: "cachet de la " + officeName,
          isBold: false
        },
        {
          type: "text",
          name:
            "Cachet et signature du directeur de la Direction consulaire du Ministère des affaires étrangères",
          isBold: true
        },
        {
          type: "text",
          name:
            "Numéro d’identification de ce document à la Direction consulaire du Ministère des affaires",
          isBold: true
        },
        {
          type: "text",
          name:
            "étrangères afghan : " +
            data.confirmNumber +
            " - Date : le " +
            data.confirmDate,
          isBold: true
        }
      ];
    } else return [];
  };
  const getOffice = () => {
    if (data.documentPlace) {
      let province = data.documentPlace.value;
      let first = province.substring(0, 1);
      switch (data.documentPlace.type) {
        case "court":
          if (
            first === "A" ||
            first === "E" ||
            first === "I" ||
            first === "O" ||
            first === "U" ||
            first === "Y" ||
            first === "H"
          ) {
            province = "d’" + province;
          } else province = "de " + province;
          officeName = "la cour d’appel de la province " + province;
          return [
            {
              type: "text",
              name:
                "Photos d’identité de la mariée et du marié, tamponnées du cachet de la ",
              isBold: true
            },
            {
              type: "text",
              name: "cour d’appel de la province " + province,
              isBold: true
            }
          ];
        case "embassy":
          officeName =
            "l’ambassade de la République islamique d'Afghanistan à " +
            province;
          return [
            {
              type: "text",
              name:
                "Photos d’identité de la mariée et du marié, tamponnées du cachet " +
                province,
              isBold: true
            },
            {
              type: "text",
              name:
                "de l’ambassade de la République islamique d'Afghanistan à " +
                province,
              isBold: true
            }
          ];
        case "otherPlace":
        default:
          officeName = province;
          return [
            {
              type: "text",
              name:
                "Photos d’identité de la mariée et du marié, tamponnées du cachet ",
              isBold: true
            },
            {
              type: "text",
              name: getCorrectName(province),
              isBold: true
            }
          ];
      }
    }
    return [];
  };
  return [
    {
      type: "text",
      name: "Traduction d’un certificat de mariage afghan",
      isBold: true,
      size: titleSize
    },
    {
      type: "text",
      name:
        "Numéro d’enregistrement général : " + data.generalRegistrationNumber,
      isBold: true
    },
    {
      type: "text",
      name:
        "Numéro d’enregistrement spécifique : " +
        data.specificRegistrationNumber,
      isBold: true
    },
    {
      type: "text",
      name: "Numéro de série : " + data.serialNumber1,
      isBold: true
    },
    {
      type: "text",
      name:
        "Tarif du certificat de mariage : " +
        data.tarrif +
        " Afghani ( a été réglé )",
      isBold: true
    },
    {
      type: "text",
      name: "Date d’émission : " + data.issueDate1,
      isBold: true
    },
    {
      type: "empty"
    },
    ...getOffice(),
    {
      type: "empty"
    },
    ...getFields(data, "1"),
    {
      type: "empty"
    },
    {
      type: "text",
      name: "S’est marié Avec :",
      isBold: true
    },
    ...getFields(data, ""),
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Témoins",
      isBold: true
    },
    {
      type: "text",
      name:
        "Photos d’identité des témoins, tamponnées du cachet de " + officeName,
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "1er Témoin",
      isBold: true,
      align: alignmentLeft
    },
    ...getFields(data["afghanRepresenter1"], ""),
    {
      type: "empty"
    },
    {
      type: "text",
      name: "2ème Témoin",
      isBold: true,
      align: alignmentLeft
    },
    ...getFields(data["afghanRepresenter2"], ""),
    {
      type: "empty"
    },
    {
      type: "text",
      name: "3ème Témoin",
      isBold: true,
      align: alignmentLeft
    },
    ...getFields(data["afghanRepresenter3"], ""),
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Garants des Témoins",
      isBold: true
    },
    {
      type: "text",
      name:
        "(Personnes certifiant l’exactitude des déclarations faites par les témoins)",
      isBold: true
    },
    {
      type: "text",
      name:
        "Photos d’identité des garants des témoins, tamponnées du cachet de " +
        officeName,
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "1er Garant des témoins",
      isBold: true,
      align: alignmentLeft
    },
    ...getFields(data["afghanWitness1"], ""),
    {
      type: "empty"
    },
    {
      type: "text",
      name: "2ème Garant des témoins ",
      isBold: true,
      align: alignmentLeft
    },
    ...getFields(data["afghanWitness2"], ""),
    {
      type: "empty"
    },
    {
      type: "text",
      name: `Selon la demande N°${data.docNumber5}, datée le ${data.dateofIssueMarriage}, de monsieur ${data.name1},`
    },
    {
      type: "text",
      name: `fils ${getCorrectName(
        data.valad1
      )}, les témoins mentionnés ci-dessus se présentent devant`
    },
    {
      type: "text",
      name: `${officeName} afin de confirmer le mariage religieux entre monsieur ${data.name1},`
    },
    {
      type: "text",
      name: `fils ${getCorrectName(data.valad1)} et madame ${
        data.name
      }, fille ${getCorrectName(data.valad)}.`
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "A cette date, reconnus sains d’esprit, et de notre plein gré, nous sommes venus témoigner",
      isBold: true
    },
    {
      type: "text",
      name: "devant " + officeName + ":",
      isBold: true
    },
    {
      type: "text",
      name: `Nous, les témoins, qui connaissons bien monsieur ${
        data.name1
      }, fils ${getCorrectName(data.valad1)},`
    },
    {
      type: "text",
      name: `petit-fils ${getCorrectName(data.valadiat1)} et madame ${
        data.name
      }, fille ${getCorrectName(data.valad)},`
    },
    {
      type: "text",
      name: `petite-fille ${getCorrectName(
        data.valadiat
      )}, certifions que ces deux personnes se sont mariées`
    },
    {
      type: "text",
      name: `religieusement le ${data.dateofMarriage} à ${data.placeofMarriage.province}. Leur mariage était conforme`
    },
    {
      type: "text",
      name: `à la loi et à la religion, et jusqu’à présent ils sont toujours mariés.`
    },
    ...getChildrenInfo(),
    {
      type: "empty"
    },
    {
      type: "text",
      name: `Notre témoignage est exact, et en cas de fausse déclaration de notre part,`
    },
    {
      type: "text",
      name: `nous sommes responsables devant la loi. De plus, les deux garants de notre`
    },
    {
      type: "text",
      name: `témoignage ont confirmé que nous connaissons bien les mariés et que notre`
    },
    {
      type: "text",
      name: `témoignage est exact. `
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: `Empreintes digitales de  mariée, des trois témoins et des deux garants des témoins`,
      isBold: true
    },
    {
      type: "text",
      name: "Signatures du président et de deux autres juges de " + officeName,
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Cachet de " + officeName,
      isBold: true
    },
    ...getExtra()
  ];
}
