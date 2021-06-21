import React, { Component } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { writeRows, writeFooter } from "./ExcelUtil";

const footer =
  "www.francedoc.fr - Plate-forme des Experts Traducteurs Assermentés";

export default class CreateReport extends Component {
  constructor(props) {
    super(props);
  }

  handleExportClick = () => {
    this.excelExport();
  };

  writeData = worksheet => {
    let rowCount = 0;
    let data = this.props.type.reportData(this.props.data);
    rowCount = writeRows(worksheet, rowCount, data);
    rowCount = writeFooter(
      worksheet,
      rowCount,
      this.props.type.code,
      this.props.id
    );
    return rowCount;
  };

  excelExport = () => {
    let ExcelJSWorkbook = new ExcelJS.Workbook();
    let worksheet = ExcelJSWorkbook.addWorksheet("sheet1", {
      views: [{ showGridLines: false }],
      pageSetup: { paperSize: 9, orientation: "portrait" },
      headerFooter: { oddFooter: footer }
    });
    worksheet.pageSetup.printTitlesColumn = "A:I";
    worksheet.getColumn("A").width = 7;
    worksheet.getColumn("B").width = 13;
    worksheet.getColumn("H").width = 13;
    worksheet.getColumn("I").width = 5;

    let rowCount = this.writeData(worksheet);

    worksheet.pageSetup.printArea = "A1:I" + rowCount;

    let self = this;
    ExcelJSWorkbook.xlsx.writeBuffer().then(function(buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        self.props.type.code + self.props.id + `.xlsx`
      );
    });
  };

  render() {
    return (
      <div align={"center"} dir={"rtl"}>
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
  data: PropTypes.object,
  id: PropTypes.number,
  type: PropTypes.object
};
