import React from "react";
import { Image } from "react-bootstrap";
import LikeIcon from "./LikeIcon";
import LikedIcon from "./LikedIcon";
import ApiService from "./ApiService";

export default class FeedPost extends React.Component {
  constructor(props) {
    super(props);
    this.ApiService = new ApiService();
    this.state = {
      liked: false
    };
    this.like = this.like.bind(this);
    this.unLike = this.unLike.bind(this);
  }

  like() {
    this.ApiService.like(this.props.post.id).then(() => {
      this.setState({
        liked: true
      });
    });
  }

  unLike() {
    this.ApiService.unLike(this.props.post.id).then(() => {
      this.setState({
        liked: false
      });
    });
  }

  render() {
    return (
      <div>
        <li className="feed-item" key={this.props.post.id}>
          <div>{this.props.post.userSummary.username}</div>
          <Image className="feed-image" src={this.props.post.url} fluid />
        </li>

        {this.state.liked ? (
          <a
            onClick={this.unLike}
            style={{
              cursor: "pointer"
            }}
          >
            <LikedIcon width={30} />
          </a>
        ) : (
          <a
            onClick={this.like}
            style={{
              cursor: "pointer"
            }}
          >
            <LikeIcon width={30} />
          </a>
        )}
      </div>
    );
  }
}
