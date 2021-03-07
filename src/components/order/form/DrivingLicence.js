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
          required: true
        },
        {
          key: "dateofIssue",
          type: "date"
        },
        
        {
          key: "drivingLicenceCategory",
          type: "select",
          options: [
            { value: "firstGrade", key: "firstGrade" },
            { value: "secondGrade", key: "secondGrade" },
            { value: "thirdGrade", key: "thirdGrade" },
            { value: "motorcycle", key: "motorcycle" },
            { value: "special", key: "special" }
          ],
          required: true
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
          key: "firstIssueDate",
          type: "date"
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