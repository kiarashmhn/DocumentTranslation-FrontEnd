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
      title: "witness",
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
          key: "nationalId",
          type: "text"
        },
        {
          key: "placeofIssueIDCertificate",
          type: "text"
        },
        {
          key: "job",
          type: "text"
        },
        {
          key: "livingPlace",
          type: "text",
          grid: 12
        },
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
          key: "nationalId",
          type: "text"
        },
        {
          key: "placeofIssueIDCertificate",
          type: "text"
        },
        {
          key: "job",
          type: "text"
        },
        {
          key: "livingPlace",
          type: "text",
          grid: 12
        },
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
          key: "nationalId",
          type: "text"
        },
        {
          key: "placeofIssueIDCertificate",
          type: "text"
        },
        {
          key: "job",
          type: "text"
        },
        {
          key: "livingPlace",
          type: "text",
          grid: 12
        }
      ]
    },
    {
      title: "representer",
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
          key: "nationalId",
          type: "text"
        },
        {
          key: "placeofIssueIDCertificate",
          type: "text"
        },
        {
          key: "job",
          type: "text"
        },
        {
          key: "livingPlace",
          type: "text",
          grid: 12
        },
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
          key: "nationalId",
          type: "text"
        },
        {
          key: "placeofIssueIDCertificate",
          type: "text"
        },
        {
          key: "job",
          type: "text"
        },
        {
          key: "livingPlace",
          type: "text",
          grid: 12
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
          type: "text"
        },
        {
          key: "mahrChandelier",
          type: "text"
        },
        {
          key: "mahrNabat",
          type: "text"
        },
        {
          key: "mahrCoin",
          type: "text"
        },
        {
          key: "mahrHaj",
          type: "text"
        },
        {
          key: "others",
          type: "text",
          grid: 12,
          notRequired: true
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
