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
        },
        {
          key: "IDCertSerieNumber",
          type: "text"
        },
        {
          key: "medicalCertificateNumber",
          type: "text"
        },
        {
          key: "job",
          type: "select",
          options: [
            { value: "employee", key: "employee" },
            { value: "freeJob", key: "freeJob" },
            { value: "nurse", key: "nurse" },
            { value: "worker1", key: "worker1" },
            { value: "schoolStudent", key: "schoolStudent" },
            { value: "uniStudent", key: "uniStudent" },
            { value: "houseWife", key: "houseWife" },
            { value: "farmer", key: "farmer" },
            { value: "doctor", key: "doctor" },
            { value: "barber", key: "barber" }
          ],
          required: true
        },
        {
          key: "religion",
          type: "select",
          options: [
            { value: "islam1", key: "islam1" },
            { value: "islam2", key: "islam2" },
            { value: "islam3", key: "islam3" },
            { value: "christian1", key: "christian1" },
            { value: "jew1", key: "jew1" },
            { value: "zartoshti", key: "zartoshti" }
          ],
          value: "islam1",
          required: true
        },
        {
          key: "iranianNationality",
          type: "text",
          value: "Iranienne / ایرانی"
        }
      ]
    },
    {
      title: "husbandInfo",
      content: [
        {
          key: "hname",
          type: "text"
        },
        {
          key: "hlastName",
          type: "text"
        },

        {
          key: "hfatherName",
          type: "text"
        },

        {
          key: "hmotherName",
          type: "text"
        },
        {
          key: "hbirthDate",
          type: "date"
        },
        {
          key: "hnationalId",
          type: "text"
        },
        {
          key: "hdateofIssueIDCertificate",
          type: "date"
        },
        {
          key: "hplaceofIssueIDCertificate",
          type: "text"
        },
        {
          key: "hIDCertSerieNumber",
          type: "text"
        },
        {
          key: "hmedicalCertificateNumber",
          type: "text"
        },
        {
          key: "hjob",
          type: "select",
          options: [
            { value: "employee", key: "employee" },
            { value: "freeJob", key: "freeJob" },
            { value: "nurse", key: "nurse" },
            { value: "worker1", key: "worker1" },
            { value: "schoolStudent", key: "schoolStudent" },
            { value: "uniStudent", key: "uniStudent" },
            { value: "houseWife", key: "houseWife" },
            { value: "farmer", key: "farmer" },
            { value: "doctor", key: "doctor" },
            { value: "barber", key: "barber" }
          ],
          required: true
        },
        {
          key: "hreligion",
          type: "select",
          options: [
            { value: "islam1", key: "islam1" },
            { value: "islam2", key: "islam2" },
            { value: "islam3", key: "islam3" },
            { value: "christian1", key: "christian1" },
            { value: "jew1", key: "jew1" },
            { value: "zartoshti", key: "zartoshti" }
          ],
          value: "islam1",
          required: true
        },
        {
          key: "hiranianNationality",
          type: "text",
          value: "Iranienne / ایرانی"
        }
      ]
    },
    {
      title: "witnesses",
      content: [
        {
          key: "witness",
          type: "witness",
          options: [
            { value: "employee", key: "employee" },
            { value: "freeJob", key: "freeJob" },
            { value: "nurse", key: "nurse" },
            { value: "worker1", key: "worker1" },
            { value: "schoolStudent", key: "schoolStudent" },
            { value: "uniStudent", key: "uniStudent" },
            { value: "houseWife", key: "houseWife" },
            { value: "farmer", key: "farmer" },
            { value: "doctor", key: "doctor" },
            { value: "barber", key: "barber" },
            { value: "others", key: "others" }
          ]
        }
      ]
    },
    {
      title: "representers",
      content: [
        {
          key: "representer",
          type: "representer",
          options: [
            { value: "employee", key: "employee" },
            { value: "freeJob", key: "freeJob" },
            { value: "nurse", key: "nurse" },
            { value: "worker1", key: "worker1" },
            { value: "schoolStudent", key: "schoolStudent" },
            { value: "uniStudent", key: "uniStudent" },
            { value: "houseWife", key: "houseWife" },
            { value: "farmer", key: "farmer" },
            { value: "doctor", key: "doctor" },
            { value: "barber", key: "barber" },
            { value: "others", key: "others" }
          ]
        }
      ]
    },
    {
      title: "marriageCertificateInformation",
      content: [
        {
          key: "documentNumber",
          type: "text"
        },
        {
          key: "serieNumber",
          type: "text"
        },
        {
          key: "cityBureau",
          type: "text"
        },
        {
          key: "registerZone",
          type: "text"
        },
        {
          key: "number",
          type: "text"
        },
        {
          key: "volume1",
          type: "text"
        },
        {
          key: "page1",
          type: "text"
        },
        {
          key: "marriageDate1",
          type: "date"
        },
        {
          key: "mariiageRegisterDate",
          type: "date"
        },
        {
          key: "stampCost",
          type: "text"
        },
        {
          key: "receiptNumber",
          type: "text"
        },
        {
          key: "depositDate",
          type: "text"
        },
        {
          key: "bankName",
          type: "text"
        },
        {
          key: "nameAghed",
          type: "text"
        },
        {
          key: "lastNameAghed",
          type: "text"
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
