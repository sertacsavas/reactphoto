import React, { Component } from "react";
import ApiService from "./ApiService";
import { Spinner } from "react-bootstrap";
import ProfilePostGallery from "./ProfilePostGallery";
import ProfileHeader from "./ProfileHeader";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.ApiService = new ApiService();
    this.state = {
      loadingposts: true,
      loadingprofile: true,
      postList: [],
      user: ""
    };
  }
  loadPosts() {
    this.ApiService.getUserByUserName(this.props.match.params.handle).then(
      result => {
        this.setState({
          user: result,
          loadingprofile: false
        });

        if (this.state.user.id) {
          this.ApiService.getUserPosts(this.state.user.id, 0, 12).then(
            result => {
              this.setState({
                loadingposts: false,
                postList: [...this.state.postList, ...result.postList]
              });
            }
          );
        }
      }
    );
  }
  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.handle !== this.props.match.params.handle) {
      this.loadPosts();
    }
  }

  render() {
    //src={this.state.user.url}
    let profile;
    let posts;
    let notAvailable;
    let loading = <Spinner animation="border" variant="secondary" />;

    if (this.state.user.id) {
      profile = <ProfileHeader user={this.state.user} />;

      if (this.state.postList.length) {
        posts = <ProfilePostGallery postList={this.state.postList} />;
      }
    } else {
      notAvailable = (
        <div className="ErrorPage__errorContainer__">
          <h2>Sorry, this page isn't available.</h2>
          <p>
            The link you followed may be broken, or the page may have been
            removed.
            <a href="/"> Go back to Photo.</a>
          </p>
        </div>
      );
    }

    return this.state.loadingprofile
      ? loading
      : this.state.user.id
      ? [profile, posts, this.state.loadingposts ? loading : null]
      : notAvailable;
  }
}
