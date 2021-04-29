export const afghanDrivingLicenceForm = {
  title: "afghanDrivingLicence",
  steps: 7,
  content: [
    {
      title: "uploadAfghanDrivingLicence",
      content: [
        {
          key: "files",
          type: "fileHandler",
          fileType: "documents"
        }
      ]
    },
    {
      title: "personalInfo",
      content: [
        {
          key: "name",
          type: "text"
        },
        {
          key: "lastName",
          type: "text"
        },
        {
          key: "fatherName",
          type: "text"
        },
        {
          key: "tazkaraInformation",
          type: "tazkaraInfo"
        },
        {
          key: "aBirthDate",
          type: "complexDate",
          required: true
        }
      ]
    },
    {
      title: "birthLocation",
      content: [
        {
          key: "provinceDistrict",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "aBirthLocation",
          required: true
        }
      ]
    },
    {
      title: "homeAddress",
      content: [
        {
          key: "provinceDistrict",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "aBirthLocation",
          required: true
        }
      ]
    },
    {
      title: "cardInfo",
      content: [
        {
          key: "bloodType",
          type: "select",
          options: [
            { value: "Oplus", key: "Oplus" },
            { value: "Ominus", key: "Ominus" },
            { value: "Aplus", key: "Aplus" },
            { value: "Aminus", key: "Aminus" },
            { value: "Bplus", key: "Bplus" },
            { value: "Bminus", key: "Bminus" },
            { value: "ABplus", key: "ABplus" },
            { value: "ABminus", key: "ABminus" }
          ],
          required: true
        },
        {
          key: "serialNumber",
          type: "text"
        },
        {
          key: "directorProvince",
          type: "text"
        },
        {
          key: "dateofIssue",
          type: "date"
        },
        {
          key: "validationDate",
          type: "date"
        },
        {
          key: "category",
          type: "text"
        },
        {
          key: "Manuscript",
          type: "text"
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
      title: "addr",
      content: [
        {
          key: "nameOrCompany",
          type: "text"
        },
        {
          key: "addr",
          grid: 12,
          type: "text"
        },
        {
          key: "postalCode",
          type: "text",
          grid: 3,
          smGrid: 6,
          xsGrid: 6
        },
        {
          key: "city",
          type: "text",
          grid: 3,
          smGrid: 6,
          xsGrid: 6
        }
      ]
    }
  ]
};
