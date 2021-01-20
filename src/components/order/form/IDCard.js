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
        },
        {
          key: "certificateId",
          type: "text"
        },
        {
          key: "postalCode",
          type: "text"
        }
      ]
    },
    {
      title: "cardInfo",
      content: [
        {
          key: "cardSerial",
          type: "text"
        },
        {
          key: "validationDate",
          type: "date"
        },
        {
          key: "isSmartCard",
          type: "check"
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
