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
          key: "aName1",
          type: "text"
        },
        {
          key: "aLastName",
          type: "text",
          notRequired: true
        },
        {
          key: "valad",
          type: "text"
        },
        {
          key: "tazkaraInformation1",
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
          key: "serialNumber2",
          type: "text"
        },
        {
          key: "directorProvince",
          type: "select",
          options: [
            { value: "kaboul", key: "kaboul" },
            { value: "herat", key: "herat" },
            { value: "nangarhar", key: "nangarhar" },
            { value: "balkh", key: "balkh" },
            { value: "kandahar", key: "kandahar" },
            { value: "ghor", key: "ghor" },
            { value: "laghman", key: "laghman" },
            { value: "kunduz", key: "kunduz" },
            { value: "paktiya", key: "paktiya" },
            { value: "zabol", key: "zabol" },
            { value: "baghlan", key: "baghlan" },
            { value: "badakhchan", key: "badakhchan" },
            { value: "bamiyan", key: "bamiyan" },
            { value: "badghis", key: "badghis" },
            { value: "maydanWardak", key: "maydanWardak" },
            { value: "logar", key: "logar" },
            { value: "samangan", key: "samangan" },
            { value: "takhar", key: "takhar" },
            { value: "nouristan", key: "nouristan" },
            { value: "faryab", key: "faryab" },
            { value: "sarpol", key: "sarpol" },
            { value: "paktika", key: "paktika" },
            { value: "farah", key: "farah" },
            { value: "helmand", key: "helmand" },
            { value: "nimroz", key: "nimroz" },
            { value: "ghazni", key: "ghazni" },
            { value: "orozgan", key: "orozgan" },
            { value: "kapissa", key: "kapissa" },
            { value: "parwan", key: "parwan" },
            { value: "pandjchir", key: "pandjchir" },
            { value: "djozdjan", key: "djozdjan" },
            { value: "khost", key: "khost" },
            { value: "kounar", key: "kounar" },
            { value: "deykandi", key: "deykandi" }
          ],
          required: true
        },
        {
          key: "dateofIssue1",
          type: "date"
        },
        {
          key: "validationDate1",
          type: "date"
        },

        {
          key: "aGrade",
          type: "check",
          grid: 5
        },
        {
          key: "bGrade",
          type: "check",
          grid: 5
        },
        {
          key: "cGrade",
          type: "check",
          grid: 5
        },
        {
          key: "dGrade",
          type: "check",
          grid: 5
        },
        {
          key: "eGrade",
          type: "check",
          grid: 12
        },
        {
          key: "licenseNumber",
          type: "multi",
          notRequired: true,
          fields: [
            {
              key: "licensePage"
            },
            {
              key: "licenseRegistration"
            }
          ]
        },
        {
          key: "ticket",
          type: "select",
          options: [
            { value: "yes", key: "yes" },
            { value: "no", key: "no" }
          ],
          required: true
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
          key: "nameOrCompany",
          type: "text"
        },
        {
          key: "address",
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
