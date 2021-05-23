export const AfghanMarriageCertificateForm = {
  title: "afghanMarriageCertificate",
  steps: 10,
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
          type: "select",
          options: [
            { value: "afghan", key: "afghan" },
            { value: "others", key: "others" }
          ],
          required: true
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
          required: true
        },
        {
          key: "livingLocationOriginal",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationOriginal",
          required: true
        }
      ]
    },
    {
      title: "husbandInfo",
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
          type: "select",
          options: [
            { value: "afghan", key: "afghan" },
            { value: "others", key: "others" }
          ],
          required: true
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
          required: true
        },
        {
          key: "livingLocationOriginal",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationOriginal",
          required: true
        }
      ]
    },
    {
      title: "confessor",
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
          key: "livingLocationTemp",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationTemp",
          required: true
        },
        {
          key: "livingLocationOriginal",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationOriginal",
          required: true
        }
      ]
    },
    {
      title: "witness",
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
          key: "livingLocationTemp",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationTemp",
          required: true
        },
        {
          key: "livingLocationOriginal",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "livingLocationOriginal",
          required: true
        }
      ]
    },
    {
      title: "children",
      content: [
        {
          key: "children",
          type: "children"
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
          key: "whichOffice",
          type: "text"
        },
        {
          key: "whichProvince",
          provinceKey: "province",
          type: "provinceDistrict",
          name: "whichProvince",
          required: true
        },
        {
          key: "whichAmbassy",
          type: "select",
          options: [
            { value: "islamabad", key: "islamabad" },
            { value: "tehran", key: "tehran" },
            { value: "doushanbe", key: "doushanbe" },
            { value: "moscow", key: "moscow" }
          ],
          notRequiredrequired: true
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
          required: true
        }
      ]
    },
    {
      title: "description",
      content: [
        {
          key: "description",
          type: "text",
          grid: 12,
          notRequired: true
        }
      ]
    },
    {
      title: "address",
      content: [
        {
          key: "address",
          grid: 12,
          type: "text"
        }
      ]
    }
  ]
};
