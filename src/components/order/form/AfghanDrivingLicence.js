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
          key: "tazkiraNumber",
          type: "text"
        },
        {
          key: "volumeNumber",
          type: "text"
        },
        {
          key: "numberofPages",
          type: "text"
        },
        {
          key: "registerNumber",
          type: "text"
        },
        {
          key: "birthDate",
          type: "date"
        }
      ]
    },
    {
      title: "birthLocation",
      content: [
        {
          key: "province",
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
          key: "district",
          type: "text"
        },
        {
          key: "village",
          type: "text"
        }
      ]
    },
    {
      title: "homeAddress",
      content: [
        {
          key: "province",
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
          key: "district",
          type: "text"
        },
        {
          key: "village",
          type: "text"
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
