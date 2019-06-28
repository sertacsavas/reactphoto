import React from "react";
import { Image } from "react-bootstrap";

export default class FeedPost extends React.Component {
  render() {
    return (
      <li className="feed-item" key={this.props.post.id}>
        <div>{this.props.post.userSummary.username}</div>
        <Image className="feed-image" src={this.props.post.url} fluid />
      </li>
    );
  }
}
