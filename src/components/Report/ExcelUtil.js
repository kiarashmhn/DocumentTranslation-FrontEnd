import { getFrenchName } from "../../Dictionary";
import * as moment from "jalali-moment";

export const alignmentCenter = { vertical: "middle", horizontal: "center" };
export const alignmentRight = { vertical: "middle", horizontal: "right" };
export const alignmentLeft = { vertical: "middle", horizontal: "left" };

export const endSection = "Signature et cachet du proposé à l’état civil";

export const writeText = (worksheet, idx, isBold, text, size) => {
  idx = idx + 1;
  worksheet.mergeCells("A" + idx + ":" + "I" + idx);
  worksheet.addRow();
  const customCell = worksheet.getCell("A" + idx);
  customCell.font = {
    name: "Times",
    family: 4,
    size: size ? size : 12,
    underline: false,
    bold: isBold
  };
  customCell.alignment = alignmentCenter;
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
    size: 12,
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
    size: 12,
    underline: false,
    bold: false
  };
  customCellDot.alignment = alignmentCenter;
  customCellDot.value = ":";

  const customCellValue = worksheet.getCell("F" + idx);
  customCellValue.font = {
    name: "Times",
    family: 4,
    size: 12,
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
  rowCount = writeText(worksheet, rowCount, false, endSection);
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
      rowCount = writeText(worksheet, rowCount, false, endSection);
      rowCount = writeText(worksheet, rowCount, false, "");
    }
  } else return writeArray(worksheet, rowCount, data, row);
  return rowCount;
};

export const writeRow = (worksheet, rowCount, row) => {
  switch (row.type) {
    case "text":
      rowCount = writeText(worksheet, rowCount, row.isBold, row.name, row.size);
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

  rowCount = writeText(worksheet, rowCount, false, first, 12);
  rowCount = writeText(worksheet, rowCount, false, second, 12);
  rowCount = writeText(worksheet, rowCount, false, third, 12);
  return rowCount;
};

export const compareDates = (date1, date2) => {
  let d1 = moment.from(date1, "en", "DD/MM/YYYY").toDate();
  let d2 = moment.from(date2, "en", "DD/MM/YYYY").toDate();

  if (d1 > d2) return 1;
  else if (d1 < d2) return -1;
  return 0;
};
