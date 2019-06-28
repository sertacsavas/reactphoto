import React, { Component } from "react";
import ProfilePost from "./ProfilePost";

export default class ProfilePostGallery extends Component {
  render() {
    let dummy = (
      <li key="1" className="gallery-item">
        <div className="gallery-image img-fluid" />
      </li>
    );
    let dummy2 = (
      <li key="2" className="gallery-item">
        <div className="gallery-image img-fluid" />
      </li>
    );

    return (
      <ul className="gallery-container gallery">
        {this.props.postList.map(post => (
          <ProfilePost className="gallery-item" post={post} key={post.id} />
        ))}
        {this.props.totalElements % 3 === 2
          ? dummy
          : this.props.totalElements % 3 === 1
          ? [dummy, dummy2]
          : null}
      </ul>
    );
  }
}
