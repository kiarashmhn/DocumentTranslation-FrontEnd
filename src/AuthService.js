import axios from "axios";
import * as URLConstant from "./URLConstant";

export default class AuthService {
  constructor(domain) {
    this.domain = domain || process.env.REACT_APP_HOST_URL;
    this.login = this.login.bind(this);
  }

  register(username, password, email) {
    return this.authenticate(username, password, URLConstant.REGISTER, email);
  }

  login(username, password) {
    return this.authenticate(username, password, URLConstant.LOGIN, "");
  }

  getUsername() {
    return localStorage.getItem("username");
  }

  authenticate(username, password, url, email) {
    return axios({
      method: "post",
      url: `${this.domain + process.env.REACT_APP_MAIN_PATH + url}`,
      data: {
        email: email,
        username: username,
        password: password
      }
    })
      .then(function(response) {
        if (response.data.success) {
          localStorage.setItem("id_token", response.data.data.token);
          localStorage.setItem("username", response.data.data.username);
          localStorage.setItem("level", response.data.data.level);
          localStorage.setItem("exp_token", Date.now() + 7 * 60 * 60 * 1000);
          return Promise.resolve(response.data);
        } else {
          return Promise.resolve(response.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired();
  }

  isTokenExpired() {
    try {
      const decoded = localStorage.getItem("exp_token");
      return decoded < Date.now();
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  logout() {
    localStorage.removeItem("id_token");
  }
}
