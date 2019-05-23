import React, { Component } from "react";
import ProfilePost from "./ProfilePost";

export default class ProfilePostGallery extends Component {
  render() {
    return (
      <ul className="gallery-container gallery">
        {this.props.postList.map(post => (
          <ProfilePost className="gallery-item" post={post} key={post.id} />
        ))}
      </ul>
    );
  }
}
