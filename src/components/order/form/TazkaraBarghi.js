export const TazkaraBarghiForm = {
  title: "TazkaraBarghi",
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
      title: "tazkaraInformation",
      content: [
        {
          key: "aName",
          type: "text"
        },
        {
          key: "aLastName",
          type: "text",
          notRequired: true
        },
        {
          key: "gender",
          type: "select",
          options: [
            { value: "M", key: "M" },
            { value: "F", key: "F" }
          ],
          required: true
        },
        {
          key: "aFatherName",
          type: "text"
        },
        {
          key: "fatherLastName",
          type: "text",
          notRequired: true
        },
        {
          key: "grandFatherName",
          type: "text"
        },

        {
          key: "aBirthDate",
          type: "date"
        },
        {
          key: "livingLocationTemp",
          type: "select",
          options: [
            { value: "Kaboul", key: "Kaboul" },
            { value: "F", key: "F" }
          ],
          required: true
        },
        {
          key: "livingLocationOriginal",
          type: "select",
          options: [
            { value: "Kaboul", key: "Kaboul" },
            { value: "F", key: "F" }
          ],
          required: true
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
          ]
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
          key: "idNumber",
          type: "text"
        },
        {
          key: "issueDate",
          type: "date"
        },
        {
          key: "signatureorFingerPrint",
          type: "select",
          options: [
            { value: "signature", key: "signature" },
            { value: "fingerPrint", key: "fingerPrint" },
            { value: "both", key: "both" },
            { value: "nothing", key: "nothing" }
          ],
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
