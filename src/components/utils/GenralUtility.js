import moment from "moment-jalaali";

export const GRN = () => {
  return (
    new Date().getTime() +
    "_" +
    Math.floor(Math.random() * moment().valueOf()) +
    "_" +
    Math.random() * moment().valueOf()
  );
};

export const timeout = delay => {
  return new Promise(res => setTimeout(res, delay));
};
