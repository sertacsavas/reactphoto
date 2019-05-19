import React, { Component } from "react";
import ApiService from "./ApiService";
import { Spinner, Row, Col, Image } from "react-bootstrap";

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

  componentDidMount() {
    this.ApiService.getUserByUserName(this.props.match.params.handle).then(
      result => {
        this.setState({
          user: result,
          loadingprofile: false
        });

        if (this.state.user.id) {
          this.loadPosts();
        }
      }
    );
  }

  loadPosts() {
    this.ApiService.getUserPosts(this.state.user.id, 0, 12).then(result => {
      this.setState({
        loadingposts: false,
        postList: [...this.state.postList, ...result.postList]
      });
    });
  }

  render() {
    //src={this.state.user.url}
    let profile;
    let posts;
    let notAvailable;
    let loading = <Spinner animation="border" variant="secondary" />;

    if (this.state.user.id) {
      profile = (
        <div className="profile">
          <Row>
            <Col xs={6} md={4}>
              <div>
                <Image
                  className="profile-photo"
                  src="https://source.unsplash.com/random/"
                  roundedCircle
                  fluid
                />
              </div>
            </Col>
            <Col xs={12} md={8}>
              <div>{this.state.user.username}</div>
              <div>{this.state.user.name}</div>
            </Col>
          </Row>
        </div>
      );
      if (this.state.postList.length) {
        posts = (
          <div className="gallery-container">
            <div className="gallery">
              {this.state.postList.map(post => (
                <div className="gallery-item">
                  <Image
                    key={post.id}
                    className="gallery-image"
                    src={post.url}
                    fluid
                  />
                </div>
              ))}
            </div>
          </div>
        );
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
