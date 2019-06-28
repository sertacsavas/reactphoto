import React from "react";
import ApiService from "./ApiService";
import FeedPost from "./FeedPost";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.ApiService = new ApiService();
    this.state = {
      loadingposts: true,
      postList: [],
      per: 12,
      page: 0,
      totalPages: null,
      scrolling: false,
      totalElements: null
    };
  }

  loadPosts() {
    this.ApiService.getFeed(this.state.page, this.state.per).then(result => {
      this.setState({
        loadingposts: false,
        postList: [...this.state.postList, ...result.postList],
        scrolling: false,
        totalPages: result.totalPages,
        totalElements: result.totalElements
      });
    });
  }

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
    if (this.props.userInfo) {
      this.loadPosts();
    }

    //this.scrollListener = window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    //window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <ul className="feed-container feed">
        {this.state.postList.map(post => (
          <FeedPost post={post} key={post.id} />
        ))}
      </ul>
    );
  }
}
