import { getFrenchName } from "../../../Dictionary.js";
import {titleSize} from "../ExcelUtil";
const capitalize = str => {
  return str && str.length > 1 ? str[0].toUpperCase() + str.slice(1) : str;
};
const upperCase = str => {
  return str && str.length > 1 ? str.toString().toUpperCase() : str;
};

const getMahr = data => {
  let res = [];
  if (data.mahrQuran && data.mahrQuran.check)
    res = [
      ...res,
      ...[
        {
          type: "text",
          name: "Un Coran d’une valeur de " + data.mahrQuran.value + " Rials ;"
        }
      ]
    ];
  if (data.mahrChandelier && data.mahrChandelier.check)
    res = [
      ...res,
      ...[
        {
          type: "text",
          name:
            "Un miroir, un chandelier électrique d’une valeur de " +
            data.mahrChandelier.value +
            " Rials ;"
        }
      ]
    ];
  if (data.mahrNabat && data.mahrNabat.check)
    res = [
      ...res,
      ...[
        {
          type: "text",
          name:
            "Un sucre cristallisé sur bâton en bois d’une valeur de " +
            data.mahrNabat.value +
            " Rials ;"
        }
      ]
    ];
  if (data.mahrCoin && data.mahrCoin.check)
    res = [
      ...res,
      ...[
        {
          type: "text",
          name: data.mahrCoin.value + " pièces d’or Azadi ;"
        }
      ]
    ];
  if (data.mahrHaj && data.mahrHaj.check)
    res = [
      ...res,
      ...[
        {
          type: "text",
          name:
            "Un voyage Hajj d’une valeur de " + data.mahrHaj.value + " Rials."
        }
      ]
    ];
  return res;
};
export function MarriageCertificateReportData(data) {
  return [
    {
      type: "text",
      name: "Traduction du Livret de Mariage",
      isBold: true,
      size: titleSize
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Ministre de la justice",
      isBold: true
    },
    {
      type: "text",
      name:
        "Organisation du Registre des Actes et des Propriétés du pays [Iran]",
      isBold: true
    },
    {
      type: "text",
      name: "Livret de mariage",
      isBold: true
    },
    {
      type: "text",
      name: "Numéro de document : " + data.documentNumber,
      isBold: true
    },

    {
      type: "text",
      name: "Numéro de série : " + data.serieNumber,
      isBold: true
    },
    {
      type: "text",
      name: "N° de référence du formulaire : ",
      isBold: true
    },
    {
      type: "text",
      name:
        "N° de référence et ville du Bureau officiel des mariages : " +
        data.cityBureau,
      isBold: true
    },
    {
      type: "text",
      name: "Zone de l’enregistrement du mariage : " + data.registerZone,
      isBold: true
    },
    {
      type: "text",
      name: "Adresse du Bureau officiel des mariages : ",
      isBold: true
    },
    {
      type: "text",
      name:
        "Référence de l’enregistrement du mariage : numéro " +
        data.number +
        ", volume " +
        data.volume1 +
        ", page " +
        data.page1,
      isBold: true
    },
    {
      type: "text",
      name: "Date du mariage : " + data.marriageDate1,
      isBold: true
    },
    {
      type: "text",
      name: "Date d’émission : " + data.mariiageRegisterDate,
      isBold: true
    },
    {
      type: "text",
      name: "Pièce jointe : Copie du document original.",
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
      name: "Au nom d'Allah, Clément et Miséricordieux",
      isBold: true
    },
    {
      type: "text",
      name:
        "Louange à Dieu, le Très Haut, qui fit naître l'Univers par l'union de la matière, a fleuri le",
      isBold: false
    },
    {
      type: "text",
      name:
        "jardin de la vie par l'union des âmes ; c'est lui qui, par le mariage a consolidé les liens d'amour",
      isBold: false,
      size: 11
    },
    {
      type: "text",
      name:
        "et d'affection, a épanoui le foyer familial par le sourire de l'enfant.",
      isBold: false,
      size: 11
    },
    {
      type: "text",
      name:
        "D'infinis saluts à l'âme pure du prophète de l'Islam et à sa famille, qui a institué, sur l'ordre de",
      isBold: false,
      size: 11
    },
    {
      type: "text",
      name:
        "Dieu, le Très-Haut, et dans la simplicité, la tradition de l'union conjugale. ",
      isBold: false,
      size: 11
    },
    {
      type: "text",
      name:
        "Par conséquent, l'Organisation du Registre des Actes et des Propriétés a mis à disposition des",
      isBold: false,
      size: 11
    },
    {
      type: "text",
      name:
        "notaires [les personnes qui ont célébré le mariage], le présent livret de mariage, pour",
      isBold: false,
      size: 11
    },
    {
      type: "text",
      name:
        "consolider la tradition du prophète d'islam et formaliser le mariage entre les mariés. ",
      isBold: false,
      size: 11
    },
    {
      type: "text",
      name:
        "Organisation du Registre des Actes et des Propriétés du pays [Iran]",
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
      name: "Identité de la mariée",
      isBold: true
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
      data: data.nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data.dateofIssueIDCertificate,
      name: "dateofIssueIDCertificate"
    },
    {
      type: "data",
      data: data.placeofIssueIDCertificate,
      name: "placeofIssueIDCertificate"
    },
    {
      type: "data",
      data: data.IDCertSerieNumber,
      name: "IDCertSerieNumber"
    },
    {
      type: "data",
      data: data.medicalCertificateNumber,
      name: "medicalCertificateNumber"
    },
    {
      type: "data",
      data: getFrenchName(data.job),
      name: "job"
    },
    {
      type: "data",
      data: getFrenchName(data.religion),
      name: "religion"
    },
    {
      type: "data",
      data: data.iranianNationality,
      name: "iranianNationality"
    },
    {
      type: "data",
      data: data.livingPlace,
      name: "livingPlace"
    },
    {
      type: "data",
      data: "Oui",
      name: "abcd"
    },
    {
      type: "data",
      data: "La mariée n’a jamais été mariée auparavant",
      name: "notification",
      size: 11
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Identité du marié",
      isBold: true
    },
    {
      type: "data",
      data: data.hname,
      name: "hname"
    },
    {
      type: "data",
      data: data.hlastName,
      name: "hlastName"
    },

    {
      type: "data",
      data: data.hfatherName,
      name: "hfatherName"
    },

    {
      type: "data",
      data: data.hmotherName,
      name: "hmotherName"
    },
    {
      type: "data",
      data: data.hbirthDate,
      name: "hbirthDate"
    },
    {
      type: "data",
      data: data.hnationalId,
      name: "hnationalId"
    },
    {
      type: "data",
      data: data.hdateofIssueIDCertificate,
      name: "hdateofIssueIDCertificate"
    },
    {
      type: "data",
      data: data.placeofIssueIDCertificate,
      name: "placeofIssueIDCertificate"
    },
    {
      type: "data",
      data: data.hIDCertSerieNumber,
      name: "hIDCertSerieNumber"
    },
    {
      type: "data",
      data: data.hmedicalCertificateNumber,
      name: "hmedicalCertificateNumber"
    },
    {
      type: "data",
      data: getFrenchName(data.hjob),
      name: "hjob"
    },
    {
      type: "data",
      data: getFrenchName(data.hreligion),
      name: "hreligion"
    },
    {
      type: "data",
      data: data.hiranianNationality,
      name: "hiranianNationality"
    },
    {
      type: "data",
      data: data.livingPlace,
      name: "livingPlace"
    },
    {
      type: "data",
      data: "Non",
      name: "abc"
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Type de mariage",
      isBold: true
    },
    {
      type: "text",
      name: "Ce mariage est un mariage permanent.",
      isBold: false
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Mahr",
      isBold: true
    },
    {
      type: "text",
      name:
        "[dot que selon l’islam l’époux doit donner à l’épouse au moment où elle le demande]",
      isBold: true
    },
    ...getMahr(data),
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "Signature du marié : " +
        capitalize(data.hname) +
        " " +
        upperCase(data.hlastName),
      isBold: true
    },
    {
      type: "text",
      name:
        "Signature de la mariée : " +
        capitalize(data.name) +
        " " +
        upperCase(data.lastName),
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
      name: "Notification",
      isBold: true
    },
    {
      type: "text",
      name:
        "Le notaire  [la personne qui a célébré le mariage] a l'obligation de faire entendre les ",
      isBold: false
    },
    {
      type: "text",
      name:
        "conditions ci-après une par une et de faire signer les mariés celles qui sont acceptées.",
      isBold: false
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Stipulations facultatives du contrat de mariage :",
      isBold: true
    },
    {
      type: "text",
      name:
        "A.	L’épouse stipule que si le divorce n’est pas à sa propre demande et si le tribunal ",
      isBold: false
    },
    {
      type: "text",
      name:
        "constate que la demande de divorce ne résulte pas d’un refus de la conjointe d’accomplir",
      isBold: false
    },
    {
      type: "text",
      name:
        "ses devoirs conjugaux ou de sa mauvaise conduite, le conjoint est tenu, suivant ",
      isBold: false
    },
    {
      type: "text",
      name:
        "l’appréciation du tribunal, de transférer à titre gracieux à la conjointe jusqu’à la moitié ",
      isBold: false
    },
    {
      type: "text",
      name:
        "des biens qu’il a acquis pendant sa vie conjugale avec son épouse ou son équivalent.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "Le conjoint donne à son épouse le mandat irrévocable avec faculté de substitution de saisir ",
      isBold: false
    },
    {
      type: "text",
      name:
        "le tribunal par une demande de divorce dans les cas énumérés ci-après : ",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "1.	Le refus de conjoint d’exécuter pendant six mois son obligation d’entretien, pour ",
      isBold: false
    },
    {
      type: "text",
      name:
        "quelque cause que ce soit, sans qu’il ait été possible de l’y contraindre, Il en est ainsi ",
      isBold: false
    },
    {
      type: "text",
      name:
        "lorsque le conjoint ne satisfait pas aux droits fondamentaux de l’épouse durant six",
      isBold: false
    },
    {
      type: "text",
      name: "mois ou qu’il n’est pas possible de les mettre d’accord.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "2. La mauvaise conduite du conjoint au point de rendre intolérable à son épouse la ",
      isBold: false
    },
    {
      type: "text",
      name: "poursuite de la vie conjugale.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "2.	Si le conjoint est affecté d’une maladie incurable mettant en péril la vie conjugale de ",
      isBold: false
    },
    {
      type: "text",
      name: "l’épouse.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "3.	La démence du conjoint dans les cas où la dissolution du mariage est impossible.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "4.	Le non-respect par le conjoint de la décision du tribunal au terme de laquelle ",
      isBold: false
    },
    {
      type: "text",
      name:
        "l’exercice d’un métier lui a été interdit comme portant atteinte aux intérêts de la famille",
      isBold: false
    },
    {
      type: "text",
      name: "et à la dignité de l’épouse.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "5.	La condamnation du conjoint par une décision définitive à une peine ",
      isBold: false
    },
    {
      type: "text",
      name:
        "d’emprisonnement de cinq ans ou plus, ou sa condamnation à une sanction pécuniaire",
      isBold: false
    },
    {
      type: "text",
      name:
        "dont l’incapacité d’exécution entraînerait un emprisonnement de cinq ans, à condition",
      isBold: false
    },
    {
      type: "text",
      name: "toutefois que la peine soit en cours d’exécution.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "6.	L’accoutumance du conjoint à toute forme de stupéfiant, reconnu par le tribunal ",
      isBold: false
    },
    {
      type: "text",
      name:
        "comme portant atteinte aux fondements mêmes de la vie familiale et rendant difficile ",
      isBold: false
    },
    {
      type: "text",
      name: "la poursuite de la vie conjugale.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "7.	Si le conjoint abandonne sans raison valable la vie conjugale, il appartient au tribunal ",
      isBold: false
    },
    {
      type: "text",
      name:
        "d’apprécier l’abandon et ses causes. Il en va de même lorsque, aux yeux du tribunal, le",
      isBold: false
    },
    {
      type: "text",
      name: "conjoint s’absente six mois consécutifs, sans motif valable.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "8.	La condamnation définitive du conjoint pour des faits délictueux et l’exécution de ",
      isBold: false
    },
    {
      type: "text",
      name:
        "toute forme de peine portant atteinte à l’honneur de la famille. Le tribunal apprécie la",
      isBold: false
    },
    {
      type: "text",
      name:
        "gravité du délit, en égard de la situation de l’épouse, aux bonnes … et aux coutumes.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "9.	Si l’épouse ne peut avoir d’enfant dans un délai de cinq ans après le mariage, en ",
      isBold: false
    },
    {
      type: "text",
      name:
        "raison de la stérilité ou d’autres problèmes physiologiques de son conjoint.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "10. Si le conjoint est absent et qu’il reste introuvable, six mois après la saisie du tribunal ",
      isBold: false
    },
    {
      type: "text",
      name: "sur ce fondement.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name:
        "11. Si le conjoint prend une seconde épouse sans le consentement de sa première",
      isBold: false
    },
    {
      type: "text",
      name: "conjointe, ou en l’absence d’une décision à cet égard.",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Stipulation (s) supplémentaire (s) : (néant)",
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
      name: "Témoins",
      isBold: true
    },
    {
      type: "text",
      name: "1er Témoin :",
      isBold: true
    },
    {
      type: "data",
      data: data["witness21"].name,
      name: "name"
    },
    {
      type: "data",
      data: data["witness21"].lastName,
      name: "lastName"
    },
    {
      type: "data",
      data: data["witness21"].fatherName,
      name: "fatherName"
    },
    {
      type: "data",
      data: data["witness21"].nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data["witness21"].placeofIssueIDCertificate,
      name: "placeofIssueIDCertificate"
    },
    {
      type: "data",
      data: data["witness21"].livingPlace,
      name: "livingPlace"
    },
    {
      type: "data",
      data: getFrenchName(data["witness21"].job),
      name: "job"
    },
    {
      type: "pureData",
      data: "Oui",
      name: "Signature du 1er témoin"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "2ème Témoin :",
      isBold: true
    },
    {
      type: "data",
      data: data["witness22"].name,
      name: "name"
    },
    {
      type: "data",
      data: data["witness22"].lastName,
      name: "lastName"
    },
    {
      type: "data",
      data: data["witness22"].fatherName,
      name: "fatherName"
    },
    {
      type: "data",
      data: data["witness22"].nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data["witness22"].placeofIssueIDCertificate,
      name: "placeofIssueIDCertificate"
    },
    {
      type: "data",
      data: data["witness22"].livingPlace,
      name: "livingPlace"
    },
    {
      type: "data",
      data: getFrenchName(data["witness22"].job),
      name: "job"
    },
    {
      type: "pureData",
      data: "Oui",
      name: "Signature du 2ème témoin"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "3ème Témoin :",
      isBold: true
    },
    {
      type: "data",
      data: data["witness23"].name,
      name: "name"
    },
    {
      type: "data",
      data: data["witness23"].lastName,
      name: "lastName"
    },
    {
      type: "data",
      data: data["witness23"].fatherName,
      name: "fatherName"
    },
    {
      type: "data",
      data: data["witness23"].nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data["witness23"].placeofIssueIDCertificate,
      name: "placeofIssueIDCertificate"
    },
    {
      type: "data",
      data: data["witness23"].livingPlace,
      name: "livingPlace"
    },
    {
      type: "data",
      data: getFrenchName(data["witness23"].job),
      name: "job"
    },
    {
      type: "pureData",
      data: "Oui",
      name: "Signature du 3ème témoin"
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Identité des représentants de la mariée et du marié",
      isBold: true
    },
    {
      type: "text",
      name: "1er représentant :",
      isBold: true
    },
    {
      type: "data",
      data: data["representer1"].name,
      name: "name"
    },
    {
      type: "data",
      data: data["representer1"].lastName,
      name: "lastName"
    },
    {
      type: "data",
      data: data["representer1"].fatherName,
      name: "fatherName"
    },
    {
      type: "data",
      data: data["representer1"].nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data["representer1"].placeofIssueIDCertificate,
      name: "placeofIssueIDCertificate"
    },
    {
      type: "data",
      data: data["representer1"].livingPlace,
      name: "livingPlace"
    },
    {
      type: "data",
      data: getFrenchName(data["representer1"].job),
      name: "job"
    },
    {
      type: "pureData",
      data: "Oui",
      name: "Signature du 1er représentant"
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "2ème représentant :",
      isBold: true
    },
    {
      type: "data",
      data: data["representer2"].name,
      name: "name"
    },
    {
      type: "data",
      data: data["representer2"].lastName,
      name: "lastName"
    },
    {
      type: "data",
      data: data["representer2"].fatherName,
      name: "fatherName"
    },
    {
      type: "data",
      data: data["representer2"].nationalId,
      name: "nationalId"
    },
    {
      type: "data",
      data: data["representer2"].placeofIssueIDCertificate,
      name: "placeofIssueIDCertificate"
    },
    {
      type: "data",
      data: data["representer2"].livingPlace,
      name: "livingPlace"
    },
    {
      type: "data",
      data: getFrenchName(data["representer2"].job),
      name: "job"
    },
    {
      type: "pureData",
      data: "Oui",
      name: "Signature du 2ème représentant"
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
        "Identité de la personne qui a célébré le mariage [notaire] entre Mr." +
        capitalize(data.hname) +
        " " +
        upperCase(data.hlastName),
      isBold: true,
      size: 11
    },
    {
      type: "text",
      name:
        "(le marié) et Mme." +
        capitalize(data.name) +
        " " +
        upperCase(data.lastName) +
        " (la mariée)",
      isBold: true
    },

    {
      type: "data",
      data: data.nameAghed,
      name: "nameAghed"
    },
    {
      type: "data",
      data: data.lastNameAghed,
      name: "lastNameAghed"
    },
    {
      type: "data",
      data: data.marriageDate1,
      name: "marriageDate1"
    },
    {
      type: "pureData",
      data: "Marriage permanent",
      name: "Type de mariage"
    },
    {
      type: "text",
      name:
        "Signature du notaire [ la personne qui a célébré le mariage ], Mr. " +
        capitalize(data.nameAghed) +
        " " +
        upperCase(data.lastNameAghed),
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
      name:
        "Nous, le marié et la mariée, après avoir bien pris connaissance du contenu de ce",
      isBold: false
    },
    {
      type: "text",
      name:
        "livret de mariage, avons le signés. Nous avons également signés au bas de chaque condition",
      isBold: false
    },
    {
      type: "text",
      name: "Signatures du marié et de la mariée",
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
      name:
        "Je soussigné, " +
        capitalize(data.nameAghed) +
        " " +
        upperCase(data.lastNameAghed) +
        ", certifie que les époux  sont bien les ",
      isBold: false
    },
    {
      type: "text",
      name:
        "personnes mentionnées et que le mariage a été prononcé entre eux. L'acte est enregistré à",
      isBold: false
    },
    {
      type: "text",
      name:
        "l’étude notariale n° " +
        data.cityBureau +
        " et remis au marié conformément à l'article 14 des ",
      isBold: false
    },
    {
      type: "text",
      name: "règlements de la loi sur le mariage.",
      isBold: false
    },
    {
      type: "text",
      name: "Signature du notaire [la personne qui a célébré le mariage]",
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
      name:
        "Notes : les frais de notaire [la personne qui a célébré le mariage] sont de cent cinquante mille",
      isBold: false
    },
    {
      type: "text",
      name: "Rials.",
      isBold: false
    },
    {
      type: "text",
      name:
        "Conformément à l'article 151 de la loi sur le registre, le frais de timbre est payé par le  ",
      isBold: false
    },
    {
      type: "text",
      name:
        "virement n° " +
        data.receiptNumber +
        " du " +
        data.depositDate +
        " à la banque " +
        data.bankName,
      isBold: false
    },
    {
      type: "text",
      name: "Signature",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "text",
      name: "Frais : " + data.stampCost + " Rials",
      isBold: true
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    },
    {
      type: "empty"
    }
  ];
}
