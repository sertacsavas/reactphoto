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
    /*return (
      <div>
        {this.props.match.params.handle}
        {this.state.postList[0]}
      </div>
    );*/
    if (this.state.loading) {
      return <div>loading...</div>;
    } else {
      console.log(this.state.userPosts);
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
    }
  }
}

//
