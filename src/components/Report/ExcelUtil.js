import { getFrenchName } from "../../Dictionary";

export const alignmentCenter = { vertical: "middle", horizontal: "center" };
export const alignmentRight = { vertical: "middle", horizontal: "right" };
export const alignmentLeft = { vertical: "middle", horizontal: "left" };

export const writeText = (worksheet, idx, isBold, text, color, size) => {
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
};

export const writeData = (worksheet, idx, key, value, align) => {
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
};

export const writeRow = (key, data, worksheet, rowCount, align) => {
  rowCount += 1;
  writeData(worksheet, rowCount, getFrenchName(key), data[key], align);
  return rowCount;
};
