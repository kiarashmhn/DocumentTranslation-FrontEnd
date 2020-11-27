import React from "react";
import { Button } from "@material-ui/core";

import "./styles.css";

export default function CustomFileUpload() {
  return (
    <div className="CustomFileUpload">
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
        />
        <Button color="secondary" variant="contained" component="span">
          آپلود تصویر
        </Button>{" "}
      </label>
    </div>
  );
}
