export const validateElement = (data, element) => {
  if (!data) return false;
  switch (element.type) {
    case "fileHandler":
      if (element.key === "files")
        return data[element.key] && data[element.key].length > 0;
      return true;
    case "provinceDistrict":
      if (isNotRequired(element, data)) return true;
      if (!validateValue(data[element.key])) return false;
      return (
        validateValue(data[element.key]["country"]) &&
        validateValue(data[element.key]["province"]) &&
        validateValue(data[element.key]["district"]) &&
        validateValue(data[element.key]["village"])
      );
    case "tazkaraInfo":
      if (isNotRequired(element, data)) return true;
      if (!validateValue(data[element.key])) return false;
      return (
        validateValue(data[element.key]["volumeNumber"]) &&
        validateValue(data[element.key]["pageNumber"]) &&
        validateValue(data[element.key]["registerNumber"])
      );
    case "address":
      if (isNotRequired(element, data)) return true;
      return (
        validateValue(data["address"]) &&
        validateValue(data["nameOrCompany"]) &&
        validateValue(data["postalCode"]) &&
        validateValue(data["city"])
      );
    case "sign":
      if (isNotRequired(element, data)) return true;
      if (!validateValue(data["ministryConfirm"])) return false;
      if (data["ministryConfirm"] === "yes")
        return (
          validateValue(data["confirmDate"]) &&
          validateValue(data["confirmNumber"])
        );
      return true;
    case "documentPlace":
      if (isNotRequired(element, data)) return true;
      if (!validateValue(data[element.key])) return false;
      return (
        validateValue(data[element.key]["type"]) &&
        validateValue(data[element.key]["value"])
      );
    case "valuable":
      if (isNotRequired(element, data)) return true;
      if (!validateValue(data[element.key])) return false;
      return validateValue(data[element.key]["value"]);
    case "children":
      if (!validateValue(data["children"]) || data["children"].length === 0)
        return true;
      else {
        let b = true;
        data["children"].forEach(c => {
          if (
            !(
              validateValue(c["name"]) &&
              validateValue(c["certificateId"]) &&
              validateValue(c["birthLocation"]) &&
              validateValue(c["birthDate"])
            )
          )
            b = false;
        });
        return b;
      }
    case "afghanChildren":
      if (
        !validateValue(data["afghanChildren"]) ||
        data["afghanChildren"].length === 0
      )
        return true;
      else {
        let b = true;
        data["afghanChildren"].forEach(c => {
          if (
            !(
              validateValue(c["name"]) &&
              validateValue(c["nationality"]) &&
              validateValue(c["aBirthDate"])
            )
          )
            b = false;
          if (!validateValue(c["registeredTazkaraInformation"])) b = false;
          else if (
            !(
              validateValue(
                c["registeredTazkaraInformation"]["volumeNumber"]
              ) &&
              validateValue(c["registeredTazkaraInformation"]["pageNumber"]) &&
              validateValue(c["registeredTazkaraInformation"]["registerNumber"])
            )
          )
            b = false;
        });
        return b;
      }
    case "spouses":
      if (!validateValue(data["spouses"]) || data["spouses"].length === 0)
        return true;
      else {
        let b = true;
        data["spouses"].forEach(c => {
          if (
            !(
              validateValue(c["name"]) &&
              validateValue(c["lastName"]) &&
              validateValue(c["certificateId"]) &&
              validateValue(c["birthDate"]) &&
              validateValue(c["marriageDate"]) &&
              validateValue(c["marriageLocation"]) &&
              validateValue(c["officeNumber"]) &&
              validateValue(c["registrationNumber"]) &&
              validateValue(c["divorceDate"]) &&
              validateValue(c["divorceLocation"]) &&
              validateValue(c["divorceRegistrationNumber"]) &&
              validateValue(c["deathDate"]) &&
              validateValue(c["deathLocation"]) &&
              validateValue(c["deathRegistrationNumber"]) &&
              validateValue(c["deathRegistrationNumber"]) &&
              validateValue(c["marriageStatus"])
            )
          )
            b = false;
        });
        return b;
      }
    case "witness":
      for (let i = 1; i <= 3; i++) {
        if (!validateValue(data[element.key + i])) return false;
        if (
          !(
            validateValue(data[element.key + i]["name"]) &&
            validateValue(data[element.key + i]["lastName"]) &&
            validateValue(data[element.key + i]["fatherName"]) &&
            validateValue(data[element.key + i]["nationalId"]) &&
            validateValue(data[element.key + i]["placeofIssueIDCertificate"]) &&
            validateValue(data[element.key + i]["job"])
          )
        )
          return false;
      }
      return true;
    case "representer":
      for (let i = 1; i <= 2; i++) {
        if (!validateValue(data[element.key + i])) return false;
        if (
          !(
            validateValue(data[element.key + i]["name"]) &&
            validateValue(data[element.key + i]["lastName"]) &&
            validateValue(data[element.key + i]["fatherName"]) &&
            validateValue(data[element.key + i]["nationalId"]) &&
            validateValue(data[element.key + i]["placeofIssueIDCertificate"]) &&
            validateValue(data[element.key + i]["job"])
          )
        )
          return false;
      }
      return true;
    case "afghanRepresenter":
      for (let i = 1; i <= 3; i++) {
        if (!validateValue(data[element.key + i.toString()])) return false;
        if (
          !(
            validateValue(data[element.key + i.toString()]["name"]) &&
            validateValue(data[element.key + i.toString()]["valad"]) &&
            validateValue(data[element.key + i.toString()]["valadiat"]) &&
            validateValue(data[element.key + i.toString()]["aBirthDate"]) &&
            validateValue(data[element.key + i.toString()]["nationality"])
          )
        )
          return false;
        if (
          !validateValue(
            data[element.key + i.toString()]["registeredTazkaraInformation"]
          )
        )
          return false;
        else if (
          !(
            validateValue(
              data[element.key + i.toString()]["registeredTazkaraInformation"][
                "volumeNumber"
              ]
            ) &&
            validateValue(
              data[element.key + i.toString()]["registeredTazkaraInformation"][
                "pageNumber"
              ]
            ) &&
            validateValue(
              data[element.key + i.toString()]["registeredTazkaraInformation"][
                "registerNumber"
              ]
            )
          )
        )
          return false;
      }
      return true;
    case "afghanWitness":
      for (let i = 1; i <= 2; i++) {
        if (!validateValue(data[element.key + i.toString()])) return false;
        if (
          !(
            validateValue(data[element.key + i.toString()]["name"]) &&
            validateValue(data[element.key + i.toString()]["valad"]) &&
            validateValue(data[element.key + i.toString()]["valadiat"]) &&
            validateValue(data[element.key + i.toString()]["aBirthDate"]) &&
            validateValue(data[element.key + i.toString()]["nationality"])
          )
        )
          return false;
        if (
          !validateValue(
            data[element.key + i.toString()]["registeredTazkaraInformation"]
          )
        )
          return false;
        else if (
          !(
            validateValue(
              data[element.key + i.toString()]["registeredTazkaraInformation"][
                "volumeNumber"
              ]
            ) &&
            validateValue(
              data[element.key + i.toString()]["registeredTazkaraInformation"][
                "pageNumber"
              ]
            ) &&
            validateValue(
              data[element.key + i.toString()]["registeredTazkaraInformation"][
                "registerNumber"
              ]
            )
          )
        )
          return false;
      }
      return true;
    case "text":
    case "date":
    case "complexDate":
    case "autoComplete":
    case "select":
      return isNotRequired(element, data) || validateValue(data[element.key]);
    default:
      return true;
  }
};

export const isNotRequired = (element, data) => {
  if (element.required) return false;
  if (element.notRequired) return true;
  if (element.notRequiredField) return !!data[element.notRequiredField];
  if (element.requiredField) return !data[element.requiredField];
  return true;
};

export const validateStep = (data, step) => {
  if (!data) return false;
  if (!step || !step.content) return true;
  let b = true;
  step.content.forEach(e => {
    if (!validateElement(data, e)) b = false;
  });
  return b;
};

export const validateForm = (data, steps) => {
  let s = [];
  steps.forEach(st => {
    s.push(!validateStep(data, st));
  });
  return s;
};

const validateValue = v => {
  return v !== null && v !== undefined && v !== "";
};
