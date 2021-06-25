export const AfghanMarriageCertificateForm = {
  title: "afghanMarriageCertificate",
  steps: 9,
  content: [
    {
      title: "uploadAfghanMarriageCertificate",
      content: [
        {
          key: "files",
          type: "fileHandler",
          fileType: "documents"
        }
      ]
    },
    {
      title: "husbandInfo",
      content: [
        {
          key: "name1",
          type: "text"
        },
        {
          key: "valad1",
          type: "text"
        },
        {
          key: "valadiat1",
          type: "text"
        },
        {
          key: "aBirthDate1",
          type: "complexDate"
        },
        {
          key: "nationality1",
          type: "text",
          value: "Afghane / افغان"
        },
        {
          key: "registeredTazkaraInformation1",
          type: "tazkaraInfo",
          notRequired: true
        },
        {
          key: "livingLocationTemp1",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationTemp",
          showCountry: true,
          required: false
        },
        {
          key: "livingLocationOriginal1",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationOriginal",
          showCountry: true,
          required: false
        }
      ]
    },
    {
      title: "wifeInfo",
      content: [
        {
          key: "name",
          type: "text"
        },
        {
          key: "valad",
          type: "text"
        },

        {
          key: "valadiat",
          type: "text"
        },

        {
          key: "aBirthDate",
          type: "complexDate"
        },
        {
          key: "nationality",
          type: "text",
          value: "Afghane / افغان"
        },
        {
          key: "registeredTazkaraInformation",
          type: "tazkaraInfo",
          notRequired: true
        },
        {
          key: "livingLocationTemp",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationTemp",
          showCountry: true,
          required: false
        },
        {
          key: "livingLocationOriginal",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationOriginal",
          showCountry: true,
          required: false
        }
      ]
    },
    {
      title: "confessor",
      content: [
        {
          key: "afghanRepresenter",
          type: "afghanRepresenter"
        }
      ]
    },
    {
      title: "witness",
      content: [
        {
          key: "afghanWitness",
          type: "afghanWitness"
        }
      ]
    },
    {
      title: "children",
      content: [
        {
          key: "afghanChildren",
          type: "afghanChildren"
        }
      ]
    },
    {
      title: "afghanMarriageCertificateInformation",
      content: [
        {
          key: "generalRegistrationNumber",
          type: "text"
        },
        {
          key: "specificRegistrationNumber",
          type: "text"
        },
        {
          key: "serialNumber1",
          type: "text"
        },
        {
          key: "tarrif",
          type: "text"
        },

        {
          key: "issueDate1",
          type: "date"
        },
        {
          key: "documentPlace",
          type: "documentPlace"
        },
        {
          key: "docNumber5",
          type: "text"
        },
        {
          key: "dateofIssueMarriage",
          type: "date"
        },
        {
          key: "dateofMarriage",
          type: "date"
        },
        {
          key: "placeofMarriage",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "placeofMarriage",
          showCountry: true,
          required: true
        },
        {
          key: "ministryConfirm",
          type: "sign"
        }
      ]
    },
    {
      title: "description",
      content: [
        {
          key: "additionalFiles",
          type: "additionalFileHandler",
          fileType: "additional",
          tooltipKey: "description"
        },
        {
          key: "description",
          type: "text",
          grid: 12,
          notRequired: true
        }
      ]
    },
    {
      title: "addr",
      content: [
        {
          key: "address",
          type: "address"
        }
      ]
    }
  ]
};
