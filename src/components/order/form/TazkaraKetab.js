export const TazkaraOldForm = {
  title: "TazkaraOld",
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
          key: "aLastName",
          type: "text",
          notRequired: true
        },
        {
          key: "aFatherName",
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
          
        },
        {
          key: "eyebrow",
          type: "select",
          options: [
            { value: "connected", key: "connected" },
            { value: "departed", key: "departed" },
            { value: "others", key: "others" }
          ],
          
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
        },
        {
          key: "SarakName",
          type: "text",
          notRequired: true
        },
        {
          key: "HouseNumber",
          type: "text",
          notRequired: true
        },
        {
          key: "TazkaraIssueDate",
          type: "date"
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
