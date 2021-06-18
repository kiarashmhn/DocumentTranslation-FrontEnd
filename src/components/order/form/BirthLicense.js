export const birthLicenseForm = {
  title: "birthLicense",
  steps: 5,
  content: [
    {
      title: "uploadBirthLicense",
      content: [
        {
          key: "files",
          type: "fileHandler",
          fileType: "documents"
        }
      ]
    },
    {
      title: "tazkaraInfo",
      content: [
        {
          key: "provinceDistrict",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "aBirthLocation",
          required: true
        },
        {
          key: "zone",
          type: "select",
          options: [
            { value: "east", key: "east" },
            { value: "west", key: "west" },
            { value: "north", key: "north" },
            { value: "south", key: "south" }
          ],
          required: true
        },
        {
          key: "houseNumber",
          type: "text"
        },
        {
          key: "volumeNo",
          type: "text"
        },
        {
          key: "pageNo",
          type: "text"
        },
        {
          key: "registerNo",
          type: "text"
        },
        {
          key: "tazkaraDate",
          type: "date"
        },
        {
          key: "tazkaraNumber",
          type: "text"
        },
        {
          key: "tazkaraNumberElectronic",
          type: "text"
        }
      ]
    },
    {
      title: "birthRegisterCard",
      content: [
        {
          key: "name",
          type: "text"
        },
        {
          key: "aLastName",
          type: "text"
        },
        {
          key: "valad",
          type: "text"
        },
        {
          key: "valadiat",
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
          key: "issueDate",
          type: "date"
        },
        {
          key: "provinceDistrict1",
          provinceKey: "province",
          districtKey: "district",
          villageKey: "village",
          type: "provinceDistrict",
          name: "aBirthLocation",
          required: true
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
          key: "registeredTazkaraInformation",
          type: "tazkaraInfo"
        },
        {
          key: "fatherstazkaraInformation",
          type: "tazkaraInfo"
        },
        {
          key: "codeBar",
          type: "text"
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
          key: "address",
          type: "address"
        }
      ]
    }
  ]
};
