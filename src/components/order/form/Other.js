export const otherForm = {
  title: "other",
  steps: 5,
  content: [
    {
      title: "otherDescr",
      content: [
        {
          key: "otherDescription",
          type: "string"
        }
      ]
    },
    {
      title: "otherUpload",
      content: [
        {
          key: "files",
          type: "fileHandler",
          fileType: "documents"
        }
      ]
    },
    {
      title: "deliveryDate",
      content: [
        {
          key: "otherDelivery",
          type: "string"
        },
        {
          key: "deliveryDate",
          type: "date",
          hideHelper: true
        },
        {
          key: "otherDeliveryDescription",
          type: "string"
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
        },
        {
          key: "empty",
          type: "empty",
          grid: 6
        },
        {
          key: "otherAddress",
          type: "select",
          options: [
            { value: "yes", key: "yes" },
            { value: "no", key: "no" }
          ],
          required: true
        }
      ]
    }
  ]
};
