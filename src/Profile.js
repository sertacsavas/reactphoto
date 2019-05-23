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
      user: "",
      per: 12,
      page: 0,
      totalPages: null,
      scrolling: false,
      totalElements: null
    };
  }

  loadUserAndPosts() {
    this.ApiService.getUserByUserName(this.props.match.params.handle).then(
      result => {
        this.setState({
          user: result,
          loadingprofile: false
        });
        this.loadPosts();
      }
    );
  }

  loadPosts() {
    if (this.state.user.id) {
      this.ApiService.getUserPosts(
        this.state.user.id,
        this.state.page,
        this.state.per
      ).then(result => {
        this.setState({
          loadingposts: false,
          postList: [...this.state.postList, ...result.postList],
          scrolling: false,
          totalPages: result.totalPages,
          totalElements: result.totalElements
        });
      });
    }
  }

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true,
        loadingposts: true
      }),
      this.loadPosts
    );
  };

  handleScroll = () => {
    const { scrolling, totalPages, page } = this.state;
    if (scrolling) return;
    if (totalPages <= page) return;
    var lastLi = document.querySelector("ul.gallery-container > li:last-child");

    if (lastLi) {
      var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
      var pageOffset = window.pageYOffset + window.innerHeight;
      var bottomOffset = 20;
      if (pageOffset > lastLiOffset - bottomOffset) {
        this.loadMore();
      }
    }
  };

  componentWillMount() {
    this.loadUserAndPosts();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.handle !== this.props.match.params.handle) {
      this.loadUserAndPosts();
    }
  }

  render() {
    return this.state.loadingprofile ? (
      <Spinner animation="border" variant="secondary" />
    ) : this.state.user.id ? (
      <div>
        <ProfileHeader
          user={this.state.user}
          totalElements={this.state.totalElements}
          userInfo={this.props.userInfo}
        />
        <ProfilePostGallery postList={this.state.postList} />
        {this.state.loadingposts ? (
          <Spinner animation="border" variant="secondary" />
        ) : null}
      </div>
    ) : (
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
}
