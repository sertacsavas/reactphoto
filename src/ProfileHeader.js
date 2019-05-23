import React, { Component } from "react";
import { Image } from "react-bootstrap";

export default class ProfileHeader extends Component {
  render() {
    return (
      <div className="profile">
        <div className="profile-image">
          <Image
            className="profile-photo"
            src="https://source.unsplash.com/random/"
            roundedCircle
            fluid
          />
        </div>
        <div className="profile-user-settings">
          <h1 className="profile-user-name">{this.props.user.username}</h1>
          {this.props.userInfo.username === this.props.user.username ? (
            <button className="btn profile-edit-btn">Edit Profile</button>
          ) : (
            <div>follow</div>
          )}
          <button
            className="btn profile-settings-btn"
            aria-label="profile settings"
          >
            <i className="fas fa-cog" aria-hidden="true" />
          </button>
        </div>
        <div className="profile-stats">
          <ul>
            <li key="1">
              <span className="profile-stat-count">
                {this.props.totalElements}
              </span>{" "}
              posts
            </li>
            <li key="2">
              <span className="profile-stat-count">
                {this.props.user.followerCount}
              </span>{" "}
              followers
            </li>
            <li key="3">
              <span className="profile-stat-count">
                {this.props.user.followedCount}
              </span>{" "}
              following
            </li>
          </ul>
        </div>
        <div className="profile-bio">
          <p>
            <span className="profile-real-name">{this.props.user.name}</span>{" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️
          </p>
        </div>
      </div>
    );
  }
}
