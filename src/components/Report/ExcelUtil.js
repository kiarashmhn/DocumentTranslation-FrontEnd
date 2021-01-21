import { getFrenchName } from "../../Dictionary";

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
    size: size ? size : 16,
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
  customCellValue.value = value === "Tehran" ? "Téhéran" : value;
  return idx;
};

export const writeDataByKey = (key, data, worksheet, rowCount, align) => {
  return writeData(worksheet, rowCount, getFrenchName(key), data[key], align);
};

export const writeArray = (worksheet, rowCount, data, row) => {
  if (data[row.name] && data[row.name].length >= 1) {
    for (let i = 0; i < data[row.name].length; i++) {
      rowCount = writeText(
        worksheet,
        rowCount,
        true,
        getFrenchName(row.name) + " " + (i + 1)
      );
      let keys = row.keys ? row.keys : Object.keys(data[row.name][i]);
      keys.map(key => {
        rowCount = writeDataByKey(
          key,
          data[row.name][i],
          worksheet,
          rowCount,
          row.align
        );
      });
      rowCount = writeText(worksheet, rowCount, false, endSection);
      rowCount = writeText(worksheet, rowCount, false, "");
    }
  } else {
    rowCount = writeText(worksheet, rowCount, true, getFrenchName(row.name));
    rowCount = writeText(worksheet, rowCount, false, "[Néant]");
  }
  return rowCount;
};

export const writeRow = (worksheet, rowCount, row, data) => {
  switch (row.type) {
    case "text":
      rowCount = writeText(worksheet, rowCount, row.isBold, row.name, row.size);
      break;
    case "empty":
      rowCount = writeText(worksheet, rowCount, false, "");
      break;
    case "data":
      rowCount = writeDataByKey(row.name, data, worksheet, rowCount, row.align);
      break;
    case "array":
      rowCount = writeArray(worksheet, rowCount, data, row);
      break;
    case "children":
      break;
    case "spouses":
      break;
    default:
      break;
  }
  return rowCount;
};

export const writeRows = (worksheet, rowCount, rows, data) => {
  rows.map(row => {
    rowCount = writeRow(worksheet, rowCount, row, data);
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

  rowCount = writeText(worksheet, rowCount, false, first);
  rowCount = writeText(worksheet, rowCount, false, second);
  rowCount = writeText(worksheet, rowCount, false, third);
  return rowCount;
};
