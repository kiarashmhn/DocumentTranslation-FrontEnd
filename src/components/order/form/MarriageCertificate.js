export const MarriageCertificateForm = {
  title: "marriageCertificate",
  steps: 10,
  content: [
    {
      title: "uploadMarriageCertificate",
      content: [
        {
          key: "files",
          type: "fileHandler",
          fileType: "documents"
        }
      ]
    },
    {
      title: "wifeInfo",
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
          key: "motherName",
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
          key: "dateofIssueIDCertificate",
          type: "date"
        },
        {
          key: "placeofIssueIDCertificate",
          type: "text"
        }
      ]
    },
    {
      title: "husbandInfo",
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
          key: "motherName",
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
          key: "dateofIssueIDCertificate",
          type: "date"
        },
        {
          key: "placeofIssueIDCertificate",
          type: "text"
        }
      ]
    },
    {
      title: "witnesses",
      content: [
        {
          key: "witness",
          type: "witness"
        }
      ]
    },
    {
      title: "representers",
      content: [
        {
          key: "representer",
          type: "representer"
        }
      ]
    },
    {
      title: "aghed",
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
          key: "marriageDate",
          type: "date"
        }
      ]
    },
    {
      title: "mahr",
      content: [
        {
          key: "mahrQuran",
          type: "valuable",
          required: false,
          valueKey: "value"
        },
        {
          key: "mahrChandelier",
          type: "valuable",
          required: false,
          valueKey: "value"
        },
        {
          key: "mahrNabat",
          type: "valuable",
          required: false,
          valueKey: "value"
        },
        {
          key: "mahrCoin",
          type: "valuable",
          valueKey: "count",
          required: true
        },
        {
          key: "mahrHaj",
          type: "valuable",
          required: false,
          valueKey: "value"
        },
        {
          key: "otherMahr",
          type: "valuable",
          required: false,
          valueKey: "byCertificate"
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
