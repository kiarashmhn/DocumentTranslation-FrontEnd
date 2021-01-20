import axios from "axios";
import GlobalErrorChecker from "../GlobalErrorChecker/GlobalErrorChecker";

export default class Api {
  constructor() {
    this.globalErrorChecker = new GlobalErrorChecker();
  }

  doPostFileAndBody = (url, data) => {
    let checker = this.globalErrorChecker;
    return axios({
      method: "post",
      url: url,
      headers: {
        Authorization: localStorage.getItem("id_token")
      },
      data: data
    })
      .then(function(response) {
        checker.checkResponse(response);
        return response.data;
      })
      .catch(function(error) {
        checker.redirectToLogin();
        console.log(error);
      });
  };

  doPostMultiPartFileAndHeader = (url, file, data) => {
    let checker = this.globalErrorChecker;
    let formData = new FormData();
    formData.append("file", file);
    formData.append("data", data);

    return axios({
      method: "post",
      url: url,
      headers: {
        "content-type": "multipart/*",
        Authorization: localStorage.getItem("id_token")
      },
      data: formData
    })
      .then(function(response) {
        checker.checkResponse(response);
        return response.data;
      })
      .catch(function(error) {
        checker.redirectToLogin();
        console.log(error);
      });
  };

  doPost = (url, postData) => {
    let checker = this.globalErrorChecker;
    return axios({
      method: "post",
      url: url,
      headers: {
        Authorization: localStorage.getItem("id_token")
      },
      data: {
        ...postData,
        username: localStorage.getItem("username"),
        adminName: localStorage.getItem("username")
      }
    })
      .then(function(response) {
        checker.checkResponse(response);
        return response.data;
      })
      .catch(function(error) {
        console.error(error.message);
        checker.redirectToLogin();
      });
  };

  doPostNoAppend = (url, postData) => {
    let checker = this.globalErrorChecker;
    return axios({
      method: "post",
      url: url,
      headers: {
        Authorization: localStorage.getItem("id_token")
      },
      data: postData
    })
      .then(function(response) {
        checker.checkResponse(response);
        return response.data;
      })
      .catch(function(error) {
        console.error(error.message);
        checker.redirectToLogin();
      });
  };

  getFile = (url, id, name) => {
    let fileDownload = require("js-file-download");
    axios({
      method: "post",
      url: url,
      headers: {
        Authorization: localStorage.getItem("id_token")
      },
      data: {
        id: id
      },
      responseType: "blob"
    }).then(function(response) {
      fileDownload(response.data, name);
    });
  };
}
