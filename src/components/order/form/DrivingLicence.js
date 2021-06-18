export const DrivingLicenceForm = {
  title: "DrivingLicence",
  steps: 5,
  content: [
    {
      title: "uploadDrivingLicenceFiles",
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
          key: "DrivingLicenceNumber",
          type: "text"
        },
        {
          key: "bloodType",
          type: "select",
          options: [
            { value: "Oplus", key: "Oplus" },
            { value: "Ominus", key: "Ominus" },
            { value: "Aplus", key: "Aplus" },
            { value: "Aminus", key: "Aminus" },
            { value: "Bplus", key: "Bplus" },
            { value: "Bminus", key: "Bminus" },
            { value: "ABplus", key: "ABplus" },
            { value: "ABminus", key: "ABminus" }
          ],
          notRequiredField: "isSmartCard"
        },
        {
          key: "dateofIssue",
          type: "date"
        },
        {
          key: "expirationDuration",
          type: "select",
          options: [
            { value: "fiveYears", key: "fiveYears" },
            { value: "tenYears", key: "tenYears" }
          ],
          required: true
        },
        {
          key: "empty1",
          type: "empty"
        },
        {
          key: "firstGrade",
          valueKey: "firstIssueDate1",
          type: "licenseType"
        },
        {
          key: "empty2",
          type: "empty"
        },
        {
          key: "secondGrade",
          valueKey: "firstIssueDate2",
          type: "licenseType"
        },
        {
          key: "empty3",
          type: "empty"
        },
        {
          key: "thirdGrade",
          valueKey: "firstIssueDate3",
          type: "licenseType"
        },
        {
          key: "empty4",
          type: "empty"
        },
        {
          key: "special",
          valueKey: "firstIssueDate4",
          type: "licenseType"
        },
        {
          key: "empty5",
          type: "empty"
        },
        {
          key: "motorcycle",
          valueKey: "firstIssueDate5",
          type: "licenseType"
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
