import { getFrenchName } from "../../Dictionary";
import * as moment from "jalali-moment";

export const alignmentCenter = { vertical: "middle", horizontal: "center" };
export const alignmentRight = { vertical: "middle", horizontal: "right" };
export const alignmentLeft = { vertical: "middle", horizontal: "left" };

const defaultSize = 10;
const emptySize = 5;
export const titleSize = 15;

export const endSection = "Signé et cacheté par le notaire";
export const childrenEndSection =
  "Signé et cacheté par l'officier de l'état civil";

export const writeText = (worksheet, idx, isBold, text, size, align) => {
  idx = idx + 1;
  worksheet.mergeCells(
    (align === alignmentLeft ? "B" : "A") + idx + ":" + "I" + idx
  );
  worksheet.addRow();
  const customCell = worksheet.getCell(
    (align === alignmentLeft ? "B" : "A") + idx
  );
  customCell.font = {
    name: "Times",
    family: 4,
    size: size ? size : text && text.length > 0 ? defaultSize : emptySize,
    underline: false,
    bold: isBold
  };
  customCell.alignment = align ? align : alignmentCenter;
  customCell.value = text;
  return idx;
};

export const writeData = (worksheet, idx, key, value, align) => {
  idx = idx + 1;
  worksheet.mergeCells("B" + idx + ":" + "D" + idx);
  worksheet.mergeCells("F" + idx + ":" + "I" + idx);
  worksheet.addRow();

  const customCellKey = worksheet.getCell("B" + idx);
  customCellKey.font = {
    name: "Times",
    family: 4,
    size: defaultSize,
    underline: false,
    bold: false
  };

  switch (align) {
    case "right":
      customCellKey.alignment = alignmentRight;
      break;
    case "left":
      customCellKey.alignment = alignmentLeft;
      break;
    case "center":
      customCellKey.alignment = alignmentCenter;
      break;
    default:
      customCellKey.alignment = alignmentLeft;
      break;
  }
  customCellKey.value = key;

  const customCellDot = worksheet.getCell("E" + idx);
  customCellDot.font = {
    name: "Times",
    family: 4,
    size: defaultSize,
    underline: false,
    bold: false
  };
  customCellDot.alignment = alignmentCenter;
  customCellDot.value = ":";

  const customCellValue = worksheet.getCell("F" + idx);
  customCellValue.font = {
    name: "Times",
    family: 4,
    size: defaultSize,
    underline: false,
    bold: false
  };
  customCellValue.alignment = alignmentLeft;
  customCellValue.value = getCorrectValue(key, value);
  return idx;
};

export const getCorrectValue = (key, value) => {
  if (!value) return "Case vide";
  if (!key) return value;
  if (value === "Tehran") return "Téhéran";
  if (value === "Iranienne / ایرانی") return "Iranienne";
  if (key.toString().includes("Prénom") || key.toString().includes("Lieu"))
    return value[0].toUpperCase() + value.slice(1);
  if (key.toString().includes("Nom")) return value.toUpperCase();
  return value;
};

export const writeDataByKey = (key, data, worksheet, rowCount, align) => {
  return writeData(worksheet, rowCount, getFrenchName(key), data, align);
};

export const writeArray = (worksheet, rowCount, data, row) => {
  if (data && data.length >= 1) {
    rowCount = writeText(worksheet, rowCount, true, getFrenchName(row.name));
    rowCount = writeText(worksheet, rowCount, false, "");
    for (let i = 0; i < data.length; i++) {
      let keys = row.keys ? row.keys : Object.keys(data[i]);
      keys.map(key => {
        rowCount = writeDataByKey(
          key,
          data[i][key],
          worksheet,
          rowCount,
          row.align
        );
      });
      rowCount = writeText(worksheet, rowCount, false, "");
    }
  } else {
    rowCount = writeText(worksheet, rowCount, true, getFrenchName(row.name));
    rowCount = writeText(worksheet, rowCount, false, "[Néant]");
  }
  if (data && data.length > 0)
    rowCount = writeText(
      worksheet,
      rowCount,
      false,
      row.name === "children" ? childrenEndSection : endSection
    );
  return rowCount;
};

export const writeSortedArray = (worksheet, rowCount, data, row) => {
  if (data && data.length >= 1) {
    for (let i = 0; i < data.length; i++) {
      rowCount = writeText(
        worksheet,
        rowCount,
        true,
        data.length > 1
          ? getFrenchName(row.name) + " " + (data.length - i)
          : getFrenchName(row.name)
      );
      let keys = row.keys ? row.keys : Object.keys(data[i]);
      keys.map(key => {
        rowCount = writeDataByKey(
          key,
          data[i][key],
          worksheet,
          rowCount,
          row.align
        );
      });
      rowCount = writeText(
        worksheet,
        rowCount,
        false,
        row.name === "children" ? childrenEndSection : endSection
      );
      rowCount = writeText(worksheet, rowCount, false, "");
    }
  } else return writeArray(worksheet, rowCount, data, row);
  return rowCount;
};

export const writeRow = (worksheet, rowCount, row) => {
  switch (row.type) {
    case "text":
      rowCount = writeText(
        worksheet,
        rowCount,
        row.isBold,
        row.name,
        row.size,
        row.align
      );
      break;
    case "empty":
      rowCount = writeText(worksheet, rowCount, false, "");
      break;
    case "data":
      rowCount = writeDataByKey(
        row.name,
        row.data,
        worksheet,
        rowCount,
        row.align
      );
      break;
    case "pureData":
      rowCount = writeData(worksheet, rowCount, row.name, row.data, row.align);
      break;
    case "array":
      rowCount = writeArray(worksheet, rowCount, row.data, row);
      break;
    case "sortedArray":
      rowCount = writeSortedArray(worksheet, rowCount, row.data, row);
      break;
    default:
      break;
  }
  return rowCount;
};

export const writeRows = (worksheet, rowCount, rows) => {
  rows.map(row => {
    rowCount = writeRow(worksheet, rowCount, row);
  });
  return rowCount;
};

export const writeFooter = (worksheet, rowCount, code, id) => {
  let first = "-------------------------------------------------------------";
  let second = `Caen, le ${(new Date().getDate() < 10
    ? "0" + new Date().getDate()
    : new Date().getDate()) +
    "/" +
    (new Date().getMonth() + 1 < 10
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear()} - Réf : ${code + id}`;

  let third =
    "Pièce jointe : Copie du document original en langue persan (farsi)";
  if (
    code === "AP" ||
    code === "AA" ||
    code === "AAB" ||
    code === "AM" ||
    code === "AN" ||
    code === "AC"
  ) {
    third = "Pièce jointe : Copie du document original en langue Dari";
  }

  rowCount = writeText(worksheet, rowCount, false, first, defaultSize);
  rowCount = writeText(worksheet, rowCount, false, second, defaultSize);
  rowCount = writeText(worksheet, rowCount, false, third, defaultSize);
  return rowCount;
};

export const compareDates = (date1, date2) => {
  let d1 = moment.from(date1, "en", "DD/MM/YYYY").toDate();
  let d2 = moment.from(date2, "en", "DD/MM/YYYY").toDate();

  if (d1 > d2) return 1;
  else if (d1 < d2) return -1;
  return 0;
};

export const getComplexDate = date => {
  if (date && date.toString().includes("[")) {
    let age = date.toString().substring(0, date.toString().lastIndexOf("["));
    let year = date.substring(date.lastIndexOf("[") + 1, date.lastIndexOf("]"));
    if (parseInt(year) < 1600) {
      let mYear = moment
        .from("01" + "/" + "01" + "/" + year, "fa", "DD/MM/YYYY")
        .format("YYYY");
      year = year + "[" + mYear + "-" + (parseInt(mYear) + 1) + "]";
    }
    return "Il était âgé de " + age + " ans en " + year;
  } else return date;
};

export const capitalize = str => {
  return str && str.length > 1 ? str[0].toUpperCase() + str.slice(1) : str;
};
export const upperCase = str => {
  return str && str.length > 1 ? str.toString().toUpperCase() : str;
};
