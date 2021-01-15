import { Component } from "react";
import AuthService from "../../AuthService";

export default class GlobalErrorChecker extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  checkResponse = response => {
    if (!response.data.success)
      switch (response.data.message) {
        case "با اطلاعات ارسالی، نشست کارر یافت نشد.":
        case "دسترسی محدود":
          this.redirectToLogin();
          break;
        case "خطای داخلی رخ داده است":
          //redirect to 500 page
          break;
        default:
          break;
      }
  };

  redirectToLogin = () => {
    this.Auth.logout();
    window.location.href = "/";
  };
}
