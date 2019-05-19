import AuthService from "./AuthService";

export default class ApiService {
  constructor() {
    this.domain = "http://localhost:8080";
    this.Auth = new AuthService();
  }

  getUserPosts(id, page, size) {
    return this.fetch(
      "/api/post/getPosts/" + id + "?page=" + page + "&size=" + size,
      {
        method: "GET"
      }
    );
  }
  getUserByUserName(username) {
    return this.fetch("/api/user/getUserByUserName/" + username, {
      method: "GET"
    });
  }

  fetch(url, options) {
    return this.Auth.fetch(`${this.domain}` + url, options);
  }
}
