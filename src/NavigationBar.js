import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";
import ApiService from "./ApiService";
export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.ApiService = new ApiService();
    this.upload = this.upload.bind(this);
  }

  upload = e => {
    const files = Array.from(e.target.files);

    const formData = new FormData();

    formData.append("file", files[0]);

    this.ApiService.upload(formData).then(() => {
      console.log("upload ok");
    });
  };

  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="/">Photo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/">
                <Button variant="primary">Home</Button>
              </Link>
            </Nav.Item>
            {this.props.loggedIn ? (
              <Nav.Item>
                <Link to={this.props.userInfo.username}>
                  <Button variant="secondary">Profile</Button>
                </Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Link to="/accounts/login">
                  <Button variant="btn btn-outline-success">Login</Button>
                </Link>
              </Nav.Item>
            )}
            {this.props.loggedIn ? (
              <Nav.Item>
                <input type="file" id="single" onChange={this.upload} />
              </Nav.Item>
            ) : null}
            {this.props.loggedIn ? (
              <Nav.Item>
                <Button
                  variant="outline-primary"
                  onClick={() => this.props.logout()}
                >
                  Logout
                </Button>
              </Nav.Item>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
/*
(
              <Nav.Item>
                <Link to="/accounts/register">
                  <Button variant="outline-primary">Register</Button>
                </Link>
              </Nav.Item>
            )
*/
