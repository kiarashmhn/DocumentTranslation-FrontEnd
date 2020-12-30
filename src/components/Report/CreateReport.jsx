import React, { Component } from "react";
import ExcelJS from "exceljs/dist/es5/exceljs.browser";
import { saveAs } from "file-saver";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { getFrenchName } from "../../Dictionary";
import { IdentityCertificateReportData } from "./IdentityCertificateReportData";

const alignmentCenter = { vertical: "middle", horizontal: "center" };
const alignmentRight = { vertical: "middle", horizontal: "right" };
const alignmentLeft = { vertical: "middle", horizontal: "left" };
const signature1 = "Daniel MOVAHHEDI Expert Traducteur et Interprète en ";
const signature2 = "Tél : 0033 (0) 6 49 60 82 93, Mail : md_movahedi@yahoo.fr";
const signature3 = "langue dari, farsi et persan près la cour d'appel de Caen,";

const signatureFont = {
  name: "Times",
  family: 4,
  size: 12,
  underline: false,
  bold: true,
  color: { argb: "FFA9A9A9" }
};

export default class CreateReport extends Component {
  constructor(props) {
    super(props);
  }

  handleExportClick = () => {
    this.excelExport();
  };

  writeText = (worksheet, idx, isBold, text) => {
    worksheet.mergeCells("A" + idx + ":" + "I" + idx);
    worksheet.addRow();
    const customCell = worksheet.getCell("A" + idx);
    customCell.font = {
      name: "Times",
      family: 4,
      size: 16,
      underline: false,
      bold: isBold
    };
    customCell.alignment = alignmentCenter;
    customCell.value = text;
  };

  writeData = (worksheet, idx, key, value, align) => {
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
    customCellValue.value = value;
  };

  writeRow = (key, data, worksheet, rowCount, align) => {
    rowCount += 1;
    this.writeData(worksheet, rowCount, getFrenchName(key), data[key], align);
    return rowCount;
  };

  writeFooter = (worksheet, data, rowCount) => {
    let first = "-------------------------------------------------------------";
    let second = `Pour traduction conforme au texte Persan - Caen, le ${new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear()}`;

    rowCount += 1;
    this.writeText(worksheet, rowCount, false, first);
    rowCount += 1;
    this.writeText(worksheet, rowCount, false, second);
    return rowCount;
  };

  writeSignature = (worksheet, rowCount) => {
    rowCount += 1;
    this.writeText(worksheet, rowCount, false, "");

    rowCount += 1;
    worksheet.mergeCells("A" + rowCount + ":" + "I" + rowCount);
    let signatureCell1 = worksheet.getCell(`A${rowCount}`);
    signatureCell1.alignment = alignmentCenter;
    signatureCell1.font = signatureFont;
    signatureCell1.value = signature1;

    rowCount += 1;
    worksheet.mergeCells("A" + rowCount + ":" + "I" + rowCount);
    let signatureCell3 = worksheet.getCell(`A${rowCount}`);
    signatureCell3.alignment = alignmentCenter;
    signatureCell3.font = signatureFont;
    signatureCell3.value = signature3;

    rowCount += 1;
    worksheet.mergeCells("A" + rowCount + ":" + "I" + rowCount);
    let signatureCell2 = worksheet.getCell(`A${rowCount}`);
    signatureCell2.alignment = alignmentCenter;
    signatureCell2.font = signatureFont;
    signatureCell2.value = signature2;

    return rowCount;
  };

  writeRows = worksheet => {
    let rowCount = 0;
    IdentityCertificateReportData.map(row => {
      if (row.type === "text") {
        rowCount += 1;
        this.writeText(worksheet, rowCount, row.isBold, row.name);
      } else if (row.type === "empty") {
        rowCount += 1;
        this.writeText(worksheet, rowCount, false, "");
      } else if (row.type === "array") {
        rowCount += 1;
        this.writeText(worksheet, rowCount, true, getFrenchName(row.name));
        if (
          this.props.data[row.name] &&
          this.props.data[row.name].length >= 1
        ) {
          for (let i = 0; i < this.props.data[row.name].length; i++) {
            let keys = row.keys
              ? row.keys
              : Object.keys(this.props.data[row.name][i]);
            keys.map(key => {
              rowCount = this.writeRow(
                key,
                this.props.data[row.name][i],
                worksheet,
                rowCount,
                row.align
              );
            });
            rowCount += 1;
            this.writeText(worksheet, rowCount, false, "");
          }
        } else {
          rowCount += 1;
          this.writeText(worksheet, rowCount, false, "[Néant]");
        }
      } else
        rowCount = this.writeRow(
          row.name,
          this.props.data,
          worksheet,
          rowCount,
          row.align
        );
    });
    rowCount += 1;
    this.writeText(worksheet, rowCount, false, "");
    rowCount = this.writeFooter(worksheet, this.props.data, rowCount);
    rowCount = this.writeSignature(worksheet, rowCount);
    return rowCount;
  };

  excelExport = () => {
    let ExcelJSWorkbook = new ExcelJS.Workbook();
    let worksheet = ExcelJSWorkbook.addWorksheet("sheet1", {
      views: [{ showGridLines: false }],
      pageSetup: { paperSize: 9, orientation: "portrait" }
    });
    worksheet.pageSetup.printTitlesColumn = "A:I";

    let rowCount = this.writeRows(worksheet);

    worksheet.pageSetup.printArea = "A1:I" + rowCount;

    ExcelJSWorkbook.xlsx.writeBuffer().then(function(buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `report.xlsx`
      );
    });
  };

  render() {
    return (
      <div align={"center"}>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleExportClick}
        >
          دانلود اکسل / télécharger excel
        </Button>
      </div>
    );
  }
}
CreateReport.propTypes = {
  data: PropTypes.object
};
