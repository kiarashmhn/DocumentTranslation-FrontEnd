export const TazkaraForm = {
  title: "Tazkara",
  steps: 7,
  content: [
    {
      title: "uploadTazkara",
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
          key: "grandFatherName",
          type: "text"
        },
        {
          key: "religion",
          type: "select",
          options: [
            { value: "islam", key: "islam" },
            { value: "hindou", key: "hindou" },
            { value: "sikhe", key: "sikhe" },
            { value: "christian", key: "christian" },
            { value: "jew", key: "jew" },
            { value: "bouddhist", key: "bouddhist" }
          ],
          required: true
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
          key: "job",
          type: "select",
          options: [
            { value: "worker", key: "worker" },
            { value: "student", key: "student" },
            { value: "houseKeeper", key: "houseKeeper" },
            { value: "free", key: "free" },
            { value: "agriculture", key: "agriculture" },
            { value: "others", key: "others" }
          ],
          required: true
        },
        {
          key: "sex",
          type: "select",
          options: [
            { value: "M", key: "M" },
            { value: "F", key: "F" }
          ],
          required: true
        },
        {
          key: "civilState",
          type: "select",
          options: [
            { value: "sigle", key: "single" },
            { value: "married", key: "married" },
            { value: "divorced", key: "divorced" },
            { value: "weadow", key: "weadow" }
          ],
          required: true
        },
        {
          key: "familyMembers",
          type: "text"
        },
        {
          key: "motherLanguage",
          type: "select",
          options: [
            { value: "pachto", key: "pachto" },
            { value: "dari", key: "dari" },
            { value: "tadjik", key: "tadjik" },
            { value: "ouzbek", key: "ouzbek" },
            { value: "turkmeni", key: "turkmeni" },
            { value: "balochi", key: "balochi" },
            { value: "pashai", key: "pashai" },
            { value: "nuristani", key: "nuristani" },
            { value: "pamiri", key: "pamiri" },
            { value: "ormuri", key: "ormuri" },
            { value: "arab", key: "arab" },
            { value: "parachi", key: "parachi" }
          ],
          required: true
        },
        {
          key: "foreignLanguage",
          type: "text"
        },
        {
          key: "militaryStatus",
          type: "select",
          options: [
            { value: "yes", key: "yes" },
            { value: "no", key: "no" }
          ],
          required: true
        },
        {
          key: "tribe",
          type: "select",
          options: [
            { value: "pashtun", key: "pashtun" },
            { value: "tajik", key: "tajik" },
            { value: "hazara", key: "hazara" },
            { value: "uzbek", key: "uzbek" },
            { value: "aimaq", key: "aimaq" },
            { value: "turkmeni", key: "turkmeni" },
            { value: "baloch", key: "baloch" },
            { value: "pashai", key: "pashai" },
            { value: "nuristani", key: "nuristani" },
            { value: "brahui", key: "brahui" },
            { value: "qizilbash", key: "qizilbash" },
            { value: "pamiri", key: "pamiri" },
            { value: "sadat", key: "sadat" },
            { value: "arab", key: "arab" },
            { value: "kyrgyz", key: "kyrgyz" },
            { value: "guijar", key: "guijar" },
            { value: "hindu", key: "hindu" },
            { value: "sikan", key: "sikan" }
          ],
          required: true
        },
        {
          key: "birthDate",
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
          name: "birthLocation",
          required: true
        }
      ]
    },
    {
      title: "appearance",
      content: [
        {
          key: "height",
          type: "select",
          options: [
            { value: "shortHeight", key: "shortHeight" },
            { value: "tall", key: "tall" },
            { value: "middle", key: "middle" },
            { value: "others", key: "others" }
          ],
          required: true
        },
        {
          key: "eyeColor",
          type: "select",
          options: [
            { value: "black", key: "black" },
            { value: "blue", key: "blue" },
            { value: "gray", key: "gray" },
            { value: "marron", key: "marron" },
            { value: "noisette", key: "noisette" },
            { value: "green", key: "green" },
            { value: "others", key: "others" }
          ],
          required: true
        },
        {
          key: "eyebrow",
          type: "select",
          options: [
            { value: "connected", key: "connected" },
            { value: "departed", key: "departed" },
            { value: "others", key: "others" }
          ],
          required: true
        },
        {
          key: "hairColor",
          type: "select",
          options: [
            { value: "black", key: "black" },
            { value: "red", key: "red" },
            { value: "blonde", key: "blonde" },
            { value: "white", key: "white" },
            { value: "marron", key: "marron" },
            { value: "others", key: "others" }
          ],
          required: true
        },
        {
          key: "skinColor",
          type: "select",
          options: [
            { value: "wheat", key: "wheat" },
            { value: "blonde", key: "blonde" },
            { value: "white", key: "white" },
            { value: "black", key: "black" },

            { value: "red", key: "red" },

            { value: "others", key: "others" }
          ],
          required: true
        },
        {
          key: "otherSigns",
          type: "select",
          options: [
            { value: "no", key: "no" },
            { value: "yes", key: "yes" },
            { value: "little", key: "little" },
            { value: "moderate", key: "moderate" },
            { value: "majorSigns", key: "majorSigns" },
            { value: "others", key: "others" }
          ],
          required: true
        }
      ]
    },
    {
      title: "tazkaraInformation",
      content: [
        {
          key: "provinceDistrict",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "registerLocation",
          required: true
        },
        {
          key: "tazkaraInformation",
          type: "tazkaraInfo"
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
