export const TazkaraBarghiForm = {
  title: "TazkaraBarghi",
  steps: 7,
  content: [
    {
      title: "uploadTazkaraBarghi",
      content: [
        {
          key: "files",
          type: "fileHandler",
          fileType: "documents"
        }
      ]
    },
    {
      title: "cardInfo",
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
          key: "aBirthLocation",
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
          key: "livingLocationTemp",
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
          key: "livingLocationOriginal",
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
          value: "afghan",
          options: [
            { value: "afghan", key: "afghan" },
            { value: "others", key: "others" }
          ],
          required: true
        },
        {
          key: "idNumberr",
          type: "text"
        },
        {
          key: "issueDate",
          type: "date"
        },
        {
          key: "signatureorFingerPrint1",
          type: "select",
          options: [
            { value: "signature", key: "signature" },
            { value: "fingerPrint", key: "fingerPrint" },
            { value: "both1", key: "both1" }
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
