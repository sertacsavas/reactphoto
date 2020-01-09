import decode from "jwt-decode";
export default class AuthService {
  constructor(domain) {
    this.domain = domain || "http://localhost:8080";
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(usernameOrEmail, password) {
    return this.fetch(`${this.domain}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify({
        usernameOrEmail,
        password
      })
    }).then(res => {
      if (res != null) {
        this.setToken(res.accessToken);
        return Promise.resolve(res);
      }
    });
  }

  signup(email, name, username, password) {
    return this.fetch(`${this.domain}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        username,
        password
      })
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  }

  getProfile() {
    return this.getToken() ? decode(this.getToken()) : null;
  }

  fetchContentType(url, options, isContentTypeIncluded, contentType) {
    // performs api calls sending the required authentication headers sertac
    let headers = {
      Accept: "application/json"
      //"Content-Type": "multipart/form-data"
    };

    if (isContentTypeIncluded) {
      headers = {
        Accept: "application/json",
        "Content-Type": contentType
      };
    }

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(res => res.text())
      .then(text => (text.length ? JSON.parse(text) : {}))
      .catch(error => {
        alert(error.message);
      });
  }

  fetchWithContentType(url, options, contentType) {
    return this.fetchContentType(url, options, true, contentType);
  }

  fetchWithoutContentType(url, options) {
    return this.fetchContentType(url, options, false, null);
  }

  fetch(url, options) {
    return this.fetchWithContentType(url, options, "application/json");
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    //console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(
        response.statusText != null && response.statusText.length
          ? response.statusText
          : response.message != null && response.message.length
          ? response.message
          : response.status
      );
      error.response = response;
      throw error;
    }
  }
}
