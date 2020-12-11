export const isFunction = functionToCheck => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
};

export const justNotNullNotUndefined = variableToCheck => {
  return typeof null !== variableToCheck && variableToCheck !== "undefined";
};

export const notNull = variableToCheck => {
  return typeof variableToCheck !== "undefined" && variableToCheck;
};

export const notNullArray = arrayToCheck => {
  return Array.isArray(arrayToCheck) && arrayToCheck.length;
};

export const isEmptyObject = objectToCheck => {
  return (
    Object.keys(objectToCheck).length === 0 &&
    objectToCheck.constructor === Object
  );
};
