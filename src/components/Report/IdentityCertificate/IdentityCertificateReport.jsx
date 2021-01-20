import React, { Component } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { getFrenchName } from "../../../Dictionary";
import { IdentityCertificateReportData } from "./IdentityCertificateReportData";
import { writeRow, writeText } from "../ExcelUtil";

const signature =
  "www.francedoc.fr - Plate-forme des Experts Traducteurs Assermentés";

const endSection = "Signature et cachet du proposé à l’état civil";

export default class IdentityCertificateReport extends Component {
  constructor(props) {
    super(props);
  }

  handleExportClick = () => {
    this.excelExport();
  };

  writeFooter = (worksheet, rowCount) => {
    let first = "-------------------------------------------------------------";
    let second = `Caen, le ${(new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate()) +
      "/" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear()} - Ref : IA${this.props.id}`;

    let third =
      "Pièce jointe : Copie du document original en langue persan (farsi)";

    rowCount += 1;
    writeText(worksheet, rowCount, false, first);
    rowCount += 1;
    writeText(worksheet, rowCount, false, second);
    rowCount += 1;
    writeText(worksheet, rowCount, false, third);
    return rowCount;
  };

  writeRows = worksheet => {
    let rowCount = 0;
    IdentityCertificateReportData.map(row => {
      if (row.type === "text") {
        rowCount += 1;
        writeText(
          worksheet,
          rowCount,
          row.isBold,
          row.name,
          row.color,
          row.size
        );
      } else if (row.type === "empty") {
        rowCount += 1;
        writeText(worksheet, rowCount, false, "");
      } else if (row.type === "array") {
        if (
          this.props.data[row.name] &&
          this.props.data[row.name].length >= 1
        ) {
          for (let i = 0; i < this.props.data[row.name].length; i++) {
            rowCount += 1;
            writeText(
              worksheet,
              rowCount,
              true,
              getFrenchName(row.name) + " " + (i + 1)
            );
            let keys = row.keys
              ? row.keys
              : Object.keys(this.props.data[row.name][i]);
            keys.map(key => {
              rowCount = writeRow(
                key,
                this.props.data[row.name][i],
                worksheet,
                rowCount,
                row.align
              );
            });
            rowCount += 1;
            writeText(worksheet, rowCount, false, endSection);
            rowCount += 1;
            writeText(worksheet, rowCount, false, "");
          }
        } else {
          rowCount += 1;
          writeText(worksheet, rowCount, true, getFrenchName(row.name));
          rowCount += 1;
          writeText(worksheet, rowCount, false, "[Néant]");
        }
      } else
        rowCount = writeRow(
          row.name,
          this.props.data,
          worksheet,
          rowCount,
          row.align
        );
    });
    rowCount += 1;
    writeText(worksheet, rowCount, false, "");
    rowCount = this.writeFooter(worksheet, rowCount);
    return rowCount;
  };

  excelExport = () => {
    let ExcelJSWorkbook = new ExcelJS.Workbook();
    let worksheet = ExcelJSWorkbook.addWorksheet("sheet1", {
      views: [{ showGridLines: false }],
      pageSetup: { paperSize: 9, orientation: "portrait" },
      headerFooter: { oddFooter: signature }
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
IdentityCertificateReport.propTypes = {
  data: PropTypes.object,
  id: PropTypes.number
};
