export const militaryServiceLicenceForm = {
  title: "militaryServiceLicence",
  steps: 5,
  content: [
    {
      title: "uploadMilitaryLicenceFiles",
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
          key: "nationalId",
          type: "text"
        },
        {
          key: "certificateId",
          type: "text",
          notRequired: true
        },
        {
          key: "birthDate",
          type: "date"
        }
      ]
    },
    {
      title: "cardInfo",
      content: [
        {
          key: "grade",
          type: "select",
          options: [
            { value: "soldier", key: "soldier" },
            { value: "secondSoldier", key: "secondSoldier" },
            { value: "firstSoldier", key: "firstSoldier" },
            { value: "corporal", key: "corporal" },
            { value: "thirdSergeant", key: "thirdSergeant" },
            { value: "secondSergeant", key: "secondSergeant" },
            { value: "firstSergeant", key: "firstSergeant" },
            { value: "secondMajor", key: "secondMajor" },
            { value: "firstMajor", key: "firstMajor" },
            { value: "thirdLieutenant", key: "thirdLieutenant" },
            { value: "secondLieutenant", key: "secondLieutenant" },
            { value: "firstLieutenant", key: "firstLieutenant" },
            { value: "firstLieutenantDoctor", key: "firstLieutenantDoctor" }
          ],
          required: true
        },

        {
          key: "cardSerial",
          type: "text"
        },
        {
          key: "dateofIssue",
          type: "date"
        },

        {
          key: "startDateofMilitaryService",
          type: "date"
        },
        {
          key: "militaryServiceEndDate",
          type: "date"
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
