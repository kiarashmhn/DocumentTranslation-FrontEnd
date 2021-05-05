export const idCardForm = {
  title: "IdentityCard",
  steps: 5,
  content: [
    {
      title: "uploadIDCardFiles",
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
          key: "gender",
          type: "select",
          options: [
            { value: "M", key: "M" },
            { value: "F", key: "F" }
          ],
          required: true
        },
        {
          key: "fatherName",
          type: "text"
        },
        {
          key: "birthDate",
          type: "date"
        },
        {
          key: "nationalId",
          type: "text"
        }
      ]
    },
    {
      title: "cardInfo",
      content: [
        {
          key: "isSmartCard",
          type: "check"
        },
        {
          key: "cardSerial",
          type: "text"
        },
        {
          key: "validationDate",
          type: "date"
        },
        {
          key: "certificateId",
          type: "text",
          notRequiredField: "isSmartCard"
        },
        {
          key: "postalCode",
          type: "text",
          notRequiredField: "isSmartCard"
        },
        {
          key: "codeBar",
          type: "text",
          notRequiredField: "isSmartCard"
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
