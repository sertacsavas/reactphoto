import AuthService from "./AuthService";

export default class ApiService {
  constructor() {
    this.domain = "http://localhost:8080";
    this.Auth = new AuthService();
  }

  getUserPosts(username, page, size) {
    return this.fetch(
      "/api/post/getPosts/" + username + "?page=" + page + "&size=" + size,
      {
        method: "GET"
      }
    );
  }

  fetch(url, options) {
    return this.Auth.fetch(`${this.domain}` + url, options);
  }
}
