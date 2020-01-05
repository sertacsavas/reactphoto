import AuthService from "./AuthService";

export default class ApiService {
  constructor() {
    this.domain = "http://localhost:8080";
    this.Auth = new AuthService();
  }

  like(id) {
    return this.fetch("/api/like/like/" + id, {
      method: "GET"
    });
  }

  unLike(id) {
    return this.fetch("/api/like/unLike/" + id, {
      method: "GET"
    });
  }

  follow(id) {
    return this.fetch("/api/follow/follow/" + id, {
      method: "GET"
    });
  }

  unfollow(id) {
    return this.fetch("/api/follow/unFollow/" + id, {
      method: "GET"
    });
  }

  getUserPosts(id, page, size) {
    return this.fetch(
      "/api/post/getPosts/" + id + "?page=" + page + "&size=" + size,
      {
        method: "GET"
      }
    );
  }

  getFeed(page, size) {
    return this.fetch("/api/post/getFeed/?page=" + page + "&size=" + size, {
      method: "GET"
    });
  }

  getProfileByUserName(username) {
    return this.fetch("/api/user/getProfileByUserName/" + username, {
      method: "GET"
    });
  }

  fetch(url, options) {
    return this.Auth.fetch(`${this.domain}` + url, options);
  }
}
