import React, { Component } from "react";
import ApiService from "./ApiService";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.ApiService = new ApiService();
    this.state = {
      loading: true,
      userPosts: []
    };
  }

  componentDidMount() {
    this.ApiService.getUserPosts(this.props.match.params.handle, 0, 50).then(
      result => {
        this.setState({
          loading: false,
          userPosts: result
        });
      }
    );
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    } else if (this.state.userPosts.postList) {
      return (
        <div>
          {this.state.userPosts.postList.map(post => (
            <div key={post.id}>
              <div>{post.id}</div>
              <div>{post.url}</div>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>no post...</div>;
    }
  }
}
