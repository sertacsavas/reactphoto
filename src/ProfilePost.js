import React, { Component } from "react";
import { Image } from "react-bootstrap";

export default class ProfilePost extends Component {
  render() {
    return (
      <li className="gallery-item" key={this.props.post.id}>
        <Image className="gallery-image" src={this.props.post.url} fluid />
      </li>
    );
  }
}
